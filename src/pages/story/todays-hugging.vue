<script setup>
import { computed, ref, onMounted } from "vue";
import { useHomeStore } from "../../stores/home/best-stories";
import pinia from "../../stores/initPinia";

// constant
const p$home = useHomeStore(pinia);

// Data dan computed properties
const currentPage = ref(1);
const itemsPerPage = ref(3);
const status = ref(null)

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return p$home.g$listBestStories.data.slice(
    start,
    start + itemsPerPage.value
  );
});

const totalPages = computed(() => {
  const data = p$home.g$listBestStories.data || [];
  return Math.ceil(data.length / itemsPerPage.value);
});

// Methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const init = async () => {
  status.value = null
  try {
    await p$home.a$listBestStories()
  } catch (e) {
    console.error(e)
  } finally {
    status.value = true
  }
}


// onMounted
onMounted(async () => {
  try {
    await init();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="relative mt-2 py-10">
    <!-- Tombol navigasi -->
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="w-6 h-6 absolute bottom-2 lg:top-2 left-4.5"
    >
      <img src="/public/icon/arrow-left.svg" alt="Previous" />
    </button>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="w-6 h-6 absolute bottom-2 lg:top-2 right-4.5"
    >
      <img src="/public/icon/arrow-right.svg" alt="Next" />
    </button>

    <!-- Konten -->
    <div class="flex flex-col lg:flex-row gap-3">
      <div v-for="data in paginatedData" :key="data.id">
        <img
          :src="data.img"
          alt="Bee"
          class="w-full min-h-[200px] max-h-[200px] object-cover object-center"
        />
        <!-- resource -->
        <div class="flex flex-row justify-between mt-1">
          <p class="small small-right">
            {{ data.date }} • {{ data.read }} min read
          </p>
          <p class="small small-right">
            --- {{ data.category }} By {{ data.author }}
          </p>
        </div>
        <!-- judul -->
        <a :href="`/detail/${data.id}`" class="hover-title">
          <h2 class="project-title mb-0 lg:mb-2 right-title">
            {{ data.title }}
          </h2>
        </a>
        <!-- konten -->
        <p class="subtitle-small right-subtitle">{{ data.content }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.small-right {
  font-size: 0.5rem; /* Mengurangi ukuran font */
  line-height: 1.4; /* Sesuaikan tinggi baris */
}
.right-title {
  font-size: 0.9rem; /* Mengurangi ukuran font judul */
}
.right-subtitle {
  font-size: 0.8rem; /* Mengurangi ukuran font subtitle */
  line-height: 1.4; /* Sesuaikan tinggi baris */
}
.hover-title {
  text-decoration: none;
}
.hover-title:hover .project-title {
  opacity: 0.6;
  text-decoration: underline;
}
.hover-title:hover {
  text-decoration: none;
}
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
