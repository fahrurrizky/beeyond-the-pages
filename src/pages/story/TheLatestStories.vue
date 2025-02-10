<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useHomeStore } from "../../stores/home/best-stories";
import pinia from "../../stores/initPinia";
import ContaintLoader from "../../components/ContaintLoader.vue";

// constant
const p$home = useHomeStore(pinia);

// Data dan computed properties
const status = ref(true);
const screenWidth = ref(0);

// Update lebar layar
const updateScreenWidth = () => {
  if (typeof window !== "undefined") {
    screenWidth.value = window.innerWidth;
  }
};

// Loader width responsive
const loaderWidth = computed(() => (screenWidth.value >= 1024 ? 753 : 300));

const listLatestStories = computed(() => {
  return p$home.g$listBestStories.data;
});

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

// onMounted
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
  <div class="mt-2 lg:mt-0 py-10 px-4">
    <!-- Konten -->
    <div class="space-y-1 lg:space-y-6">
      <!-- loader -->
      <template v-if="!status">
        <div class="flex flex-col lg:flex-row gap-3 lg:gap-10">
          <!-- Loader Image -->
          <div class="min-w-[250px] max-w-[250px] min-h-[150px] max-h-[150px]">
            <ContaintLoader :width="250" :height="150">
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContaintLoader>
          </div>
          <!-- Loader Text -->
          <div class="flex flex-col space-y-3">
            <ContaintLoader :width="200" :height="15">
              <rect x="0" y="0" rx="3" ry="3" width="100%" height="15px" />
            </ContaintLoader>
            <ContaintLoader :width="300" :height="20">
              <rect x="0" y="0" rx="3" ry="3" width="100%" height="20px" />
            </ContaintLoader>
            <ContaintLoader :width="loaderWidth" :height="60">
              <rect x="0" y="0" rx="3" ry="3" width="100%" height="60px" />
            </ContaintLoader>
            <ContaintLoader :width="150" :height="15">
              <rect x="0" y="0" rx="3" ry="3" width="100%" height="15px" />
            </ContaintLoader>
          </div>
        </div>
      </template>
      <img
        v-if="!status"
        src="/public/icon/bee.gif"
        alt="Bee"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-30 h-30"
      />
      <!-- loader -->
      <template v-else>
        <div v-for="data in listLatestStories" :key="data.id">
          <div class="flex flex-col lg:flex-row gap-1 lg:gap-10">
            <div>
              <img
                :src="data.img"
                alt="Bee"
                class="w-full lg:min-w-[250px] lg:max-w-[250px] min-h-[140px] max-h-[140px] object-cover object-center"
              />
            </div>
            <div>
              <!-- resource -->
              <p class="small small-right mb-3 hidden-mobile">
                --- {{ data.category }} By {{ data.author }}
              </p>
              <div class="flex flex-row justify-between hidden-desktop">
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
              <p class="subtitle-small right-subtitle mb-3">
                {{ data.content.slice(0, 433) }}....
              </p>
              <p class="small small-right hidden-mobile">
                {{ data.date }} • {{ data.read }} min read
              </p>
            </div>
          </div>
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
  .right-title {
    font-size: 1.5rem; /* Mengurangi ukuran font judul */
  }
  .small-right {
    font-size: 0.5rem; /* Mengurangi ukuran font */
    line-height: 1.4; /* Sesuaikan tinggi baris */
    margin-bottom: 0.5rem; /* Sesuaikan margin */
  }
}
@media (max-width: 767px) {
  .right-title {
    font-size: 1rem; /* Mengurangi ukuran font judul */
    margin-bottom: 0.5rem; /* Sesuaikan margin */
  }
  .right-subtitle {
    font-size: 0.8rem; /* Mengurangi ukuran font subtitle */
    line-height: 1.4; /* Sesuaikan tinggi baris */
  }
  .hidden-mobile {
    display: none;
  }
  .small-right {
    font-size: 0.5rem; /* Mengurangi ukuran font */
    line-height: 1.4; /* Sesuaikan tinggi baris */
  }
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
