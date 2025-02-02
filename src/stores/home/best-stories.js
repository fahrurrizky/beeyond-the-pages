import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import * as sv$home from "../../services/home/best-stories";

/**
 * Device Store.
 */
export const useHomeStore = defineStore("home", () => {
  // state
  const listBestStories = ref({
    status: null,
    data: [],
  });

  // getters
  const g$listBestStories = computed(() => listBestStories.value);

  // actions
  const a$listBestStories = async () => {
    try {
      listBestStories.value.status = null;
      const { status, data } = await sv$home.listBestStories();
      listBestStories.value = { status, data };
    } catch (error) {
      listBestStories.value = {
        status: false,
        data: [],
      };
      throw error?.message ?? error;
    }
  };

  // exposed
  return {
    // getters
    g$listBestStories,
    // actions
    a$listBestStories,
  };
});

// support HMR
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useHomeStore, import.meta.hot));

export default useHomeStore;
