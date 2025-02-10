<script setup>
import { ref, onMounted } from "vue";

const status = ref(false);

onMounted(() => {
  setTimeout(() => {
    status.value = true;
  }, 3000);
});
</script>

<template>
  <div
    v-if="!status"
    class="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-1000 grid-bg"
  >
    <div class="relative flex flex-col items-center">
      <h2>Welcome to</h2>
      <h2 class="text-center hidden md:block">
        Beeyond The Pages - Unveiling The World Through Words
      </h2>
      <h2 class="text-center md:hidden">
        Beeyond The Pages<br />Unveiling The World Through Words
      </h2>
      <img
        src="/logo/btploader.png"
        alt="Beeyond The Pages"
        class="w-[300px] lg:w-[550px] h-auto"
      />
      <div class="w-[250px] h-[4px] bg-gray-300 mt-3 relative overflow-hidden">
        <div class="h-full bg-blue-400 bg-opacity-45 animate-loading"></div>
      </div>
      <!-- Bee yang bergerak dari bawah ke atas -->
      <img
        src="/icon/bee.gif"
        alt="Bee"
        class="absolute w-30 h-30 animate-fly-up"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes loading {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

.animate-loading {
  animation: loading 3s ease-in-out forwards;
}
@keyframes fly-up {
  0% {
    transform: translateY(100px) translateX(0) rotate(0deg);
  }
  25% {
    transform: translateY(50px) translateX(-50px) rotate(30deg);
  }
  50% {
    transform: translateY(0px) translateX(0) rotate(0deg);
  }
  75% {
    transform: translateY(-50px) translateX(50px) rotate(-30deg);
  }
  100% {
    transform: translateY(-100px) translateX(0) rotate(0deg);
  }
}

.animate-fly-up {
  animation: fly-up 2s ease-in-out infinite alternate;
}
.grid-bg {
  --opacity: 0.75;
  --gray: rgb(229 231 235 / var(--opacity)); /* gray-200 */
  background-image: linear-gradient(to right, var(--gray) 1px, transparent 1px),
    linear-gradient(to bottom, var(--gray) 1px, transparent 1px);
  background-repeat: repeat;
  background-position: -10px -10px;
  background-size: 20px 20px;
}
</style>
