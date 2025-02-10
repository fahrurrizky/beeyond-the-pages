<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useHomeStore } from "../../stores/home/best-stories";
import pinia from "../../stores/initPinia";
import ContaintLoader from "../../components/ContaintLoader.vue";

// Store
const p$home = useHomeStore(pinia);

// State
const status = ref(true);
const screenWidth = ref(0);

// Update lebar layar
const updateScreenWidth = () => {
  if (typeof window !== "undefined") {
    screenWidth.value = window.innerWidth;
  }
};

// Computed properties
const dataBestStories = computed(() => p$home.g$listBestStories.data || []);
const leftContent = computed(() => dataBestStories.value[0] || null);
const rightContent = computed(() => dataBestStories.value.slice(1, 3));

// Loader width responsive
const loaderWidth = computed(() => (screenWidth.value >= 1024 ? 653 : 353));

// Methods
const init = async () => {
  status.value = false;
  try {
    await p$home.a$listBestStories();
  } catch (e) {
    notify.error(e);
  } finally {
    setTimeout(() => {
      status.value = true;
    }, 1000);
  }
};

// Lifecycle Hooks
onMounted(async () => {
  updateScreenWidth();
  window.addEventListener("resize", updateScreenWidth);
  try {
    await init();
  } catch (error) {
    console.error(error);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-3 lg:gap-5 mt-2 lg:mt-0 px-4">
    <!-- Left Content (Index 0) -->
    <div v-if="!status" class="lg:basis-2/3">
      <ContaintLoader :width="loaderWidth" :height="250">
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="200px" />
        <rect x="0" y="210" rx="3" ry="3" width="60%" height="15px" />
        <rect x="0" y="230" rx="3" ry="3" width="80%" height="15px" />
      </ContaintLoader>
    </div>
    <img
      v-if="!status"
      src="/public/icon/bee.gif"
      alt="Bee"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-30 h-30"
    />

    <div v-else-if="leftContent" class="lg:basis-2/3">
      <img :src="leftContent.img" alt="Bee" class="lg:fixed-size" />
      <div class="flex flex-row justify-between mt-1">
        <p class="small small-left">
          {{ leftContent.date }} • {{ leftContent.read }} min read
        </p>
        <p class="small small-left">
          --- {{ leftContent.category }} By {{ leftContent.author }}
        </p>
      </div>
      <a :href="`/detail/${leftContent.id}`">
        <h2 class="lg:title-blog mb-2 left-title">{{ leftContent.title }}</h2>
      </a>
      <p class="subtitle-small left-subtitle">
        {{ leftContent.content.slice(0, 306) }}..........
      </p>
    </div>

    <div
      class="border-b-1 border-b-gray-200 lg:border-r-1 border-r-gray-200"
    ></div>

    <!-- Right Content (Index 1 & 2) -->
    <div class="flex flex-row lg:flex-col gap-3 lg:basis-1/3 lg:max-h-[200px]">
      <template v-if="!status">
        <ContaintLoader v-for="i in 2" :key="i" :width="353" :height="150">
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="100px" />
          <rect x="0" y="110" rx="3" ry="3" width="60%" height="15px" />
          <rect x="0" y="130" rx="3" ry="3" width="80%" height="15px" />
        </ContaintLoader>
      </template>

      <template v-else>
        <div v-for="data in rightContent" :key="data.id">
          <img
            :src="data.img"
            alt="Bee"
            class="w-full h-auto min-h-[100px] max-h-[100px] lg:max-h-[190px] object-cover"
          />
          <div class="flex flex-row justify-end lg:justify-between mt-1">
            <p class="small small-right hidden-mobile">
              {{ data.date }} • {{ data.read }} min read
            </p>
            <p class="small small-right">
              --- {{ data.category }} By {{ data.author }}
            </p>
          </div>
          <a :href="`/detail/${data.id}`">
            <h2 class="project-title mb-0 lg:mb-2 right-title">
              {{ data.title }}
            </h2>
          </a>
          <div class="hidden-desktop flex flex-row justify-between mt-1">
            <p class="small small-right">{{ data.date }} &bull;</p>
            <p class="small small-right">{{ data.read }} min read</p>
          </div>
          <p class="subtitle-small right-subtitle">
            {{ data.content.slice(0, 135) }}..........
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .hidden-desktop {
    display: none;
  }
  .left-title {
  font-size: 1.5rem; /* Mengurangi ukuran font judul */
  margin-bottom: 0.5rem; /* Sesuaikan margin */
}
}

@media (max-width: 767px) {
  .small-left {
    font-size: 0.5rem; /* Mengurangi ukuran font */
    line-height: 1.4; /* Sesuaikan tinggi baris */
    margin-bottom: 0.2rem; /* Sesuaikan margin */
  }
  .left-title {
    font-size: 1rem; /* Mengurangi ukuran font judul */
    line-height: 1; /* Sesuaikan tinggi baris */
  }
  .left-subtitle {
    font-size: 0.8rem; /* Mengurangi ukuran font subtitle */
    line-height: 1.4; /* Sesuaikan tinggi baris */
  }
  .hidden-mobile {
    display: none;
  }
}
.small-right {
  font-size: 0.5rem; /* Mengurangi ukuran font */
  line-height: 1.4; /* Sesuaikan tinggi baris */
}
.right-title {
  font-size: 1.0rem; /* Mengurangi ukuran font judul */
}
.right-subtitle {
  font-size: 0.8rem; /* Mengurangi ukuran font subtitle */
  line-height: 1.4; /* Sesuaikan tinggi baris */
}
.fixed-size {
  width: 195px; /* Tetapkan lebar tetap */
  height: 100px; /* Tetapkan tinggi tetap */
  object-fit: cover; /* Pastikan gambar tidak terdistorsi */
  object-position: center; /* Atur posisi gambar */
}
a {
  transition:
    opacity 0.3s ease,
    text-decoration 0.3s ease;
}

a:hover {
  opacity: 0.6;
  text-decoration: underline;
}
</style>
