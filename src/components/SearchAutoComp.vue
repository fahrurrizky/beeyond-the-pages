<script>
export default {
  data() {
    return {
      query: "",
      suggestions: [
        { type: "Users", name: "John Doe", image: "/public/assets/jon-tyson-XzUMBNmQro0-unsplash.jpg" },
        { type: "Users", name: "Jane Smith", image: "/public/assets/jon-tyson-XzUMBNmQro0-unsplash.jpg" },
        { type: "Stories", name: "The Adventure Begins", image: "/public/assets/Snapinst.app_474035939_18088989637543359_3199483165713372870_n_1080.jpg" },
        { type: "Stories", name: "Mystery in the Forest", image: "/public/assets/anders-j-GLi6z3JiWmI-unsplash.jpg" },
        { type: "Books", name: "The Art of Vue.js", image: "/public/assets/arty-irPNl4bRLA8-unsplash.jpg" },
        { type: "Books", name: "Mastering JavaScript", image: "/public/assets/rishabh-dharmani-x0gw9YspcR4-unsplash.jpg" },
      ],
      filteredSuggestions: [],
      showPopover: false,
    };
  },
  methods: {
    onInput() {
      if (this.query.trim() === "") {
        this.filteredSuggestions = [];
        this.showPopover = false;
      } else {
        this.filteredSuggestions = this.suggestions.filter((suggestion) =>
          suggestion.name.toLowerCase().includes(this.query.toLowerCase())
        );
        this.showPopover = true; // Pastikan popover tetap muncul meskipun kosong
      }
    },
    selectSuggestion(suggestion) {
      this.query = suggestion.name;
      this.filteredSuggestions = [];
      this.showPopover = false;
      this.$emit("select", suggestion);
    },
    handleClickOutside(event) {
      if (this.$refs.searchContainer && !this.$refs.searchContainer.contains(event.target)) {
        this.showPopover = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<template>
  <div ref="searchContainer" class="relative">
    <div class="hidden lg:relative lg:flex lg:items-center">
      <img src="/public/icon/search.svg" alt="Search" class="absolute left-2 w-4 h-4" />
      <input
        type="text"
        v-model="query"
        placeholder="Search..."
        @input="onInput"
        class="p-1 pl-6 text-sm w-70 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        aria-label="Search"
      />
    </div>

    <!-- Popover dengan suggestions -->
    <div v-if="showPopover" class="absolute mt-2 z-10 w-70 bg-white border border-gray-200 rounded-md shadow-xl left-0 max-h-150 overflow-y-auto">
      <div class="px-3 py-2">
        <div class="flex justify-between">
            <h2 class="text-gray-900 dark:text-white">Suggestions</h2>
            <img src="/public/icon/arrow-down.svg" class="w-5 h-5" alt="arrow-down" />
        </div>
        <!-- Jika tidak ada hasil, tampilkan 'No result' -->
        <div v-if="filteredSuggestions.length === 0" class="p-2 text-gray-500 text-sm italic">
          No result
        </div>

        <!-- Looping berdasarkan kategori -->
        <template v-for="category in ['Users', 'Stories', 'Books']" :key="category">
          <h2 v-if="filteredSuggestions.some(s => s.type === category)" class="text-sm mt-2">{{ category }}</h2>
          <ul>
            <li
              v-for="(suggestion, index) in filteredSuggestions.filter(s => s.type === category)"
              :key="index"
              class="c-gray-600 text-sm flex items-center p-2 cursor-pointer hover:bg-blue-200 rounded-md"
              @click="selectSuggestion(suggestion)"
            >
              <img :src="suggestion.image" :class="suggestion.type === 'Users' ? 'w-8 h-8 object-cover mr-2 rounded-full' : 'w-8 h-8 object-cover mr-2'" alt="icon" />
              {{ suggestion.name }}
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
