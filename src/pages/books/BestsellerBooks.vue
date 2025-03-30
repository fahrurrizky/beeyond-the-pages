<script setup>
import { computed, ref, onMounted } from "vue";
import { useHomeStore } from "../../stores/home/best-stories";
import pinia from "../../stores/initPinia";
import ContaintLoader from "../../components/ContaintLoader.vue";
import BaseButton from "../../components/BaseButton.vue";

// constant
const p$home = useHomeStore(pinia);

// Data dan computed properties
const currentPage = ref(1);
const itemsPerPage = ref(5);
const status = ref(true);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return p$home.g$listBestStories.data.slice(start, start + itemsPerPage.value);
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
  status.value = false;
  try {
    await p$home.a$listBestStories();
  } catch (e) {
    console.error(e);
  } finally {
    setTimeout(() => {
      status.value = true;
    }, 1000);
  }
};

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
  <div class="relative mt-2 py-10 px-4">
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

    <!-- Konten dengan lebar penuh -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-10 w-full">
      <div v-for="data in paginatedData" :key="data.id" class="w-full">
        <!-- loader -->
        <ContaintLoader v-if="!status" :width="353" :height="250">
          <rect x="0" y="0" rx="5" ry="5" width="45%" height="200px" />
          <rect x="0" y="210" rx="3" ry="3" width="40%" height="15px" />
          <rect x="0" y="230" rx="3" ry="3" width="45%" height="15px" />
        </ContaintLoader>
        <img
          v-if="!status"
          src="/public/icon/bee.gif"
          alt="Bee"
          class="absolute top-1/2 left-1/1.5 lg:left-1/1.8 transform -translate-x-1/2 -translate-y-1/2 w-30 h-30"
        />
        <!-- loader -->
        <template v-else>
          <a :href="`/detail/${data.id}`" class="hover-image block w-full">
            <img
              :src="data.img"
              alt="Bee"
              class="w-full h-[250px] object-cover object-center"
            />
          </a>
          <!-- author -->
          <div class="mt-1">
            <p class="small small-right">--- By {{ data.author }}</p>
          </div>
          <!-- judul -->
          <h2 class="project-title mb-0 lg:mb-2 right-title">
            {{ data.title.slice(0, 55) }}
          </h2>
          <!-- button buy -->
          <BaseButton size="sm" class="mt-2 w-full">
            Buy for ${{ data.price }}
          </BaseButton>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.small-right {
  font-size: 0.6rem; /* Mengurangi ukuran font */
  line-height: 1.4; /* Sesuaikan tinggi baris */
  margin-bottom: 0.2rem; /* Sesuaikan margin */
}
.right-title {
  font-size: 1rem; /* Mengurangi ukuran font judul */
  margin-bottom: 0.2rem; /* Sesuaikan margin */
}
.right-subtitle {
  font-size: 0.8rem; /* Mengurangi ukuran font subtitle */
  line-height: 1.4; /* Sesuaikan tinggi baris */
}
.hover-image {
  text-decoration: none;
  display: block;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hover-image img {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hover-image:hover img {
  transform: scale(1.05);
  opacity: 0.9;
}

.hover-image:hover .project-title {
  opacity: 0.8;
  text-decoration: underline;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
