<script setup>
import { ref, onMounted } from "vue";

const blogContent = ref("");

onMounted(() => {
  const contentEditable = document.getElementById("editor");
  contentEditable.addEventListener("input", () => {
    blogContent.value = contentEditable.innerHTML.trim();
    contentEditable.dataset.placeholder = blogContent.value
      ? ""
      : "Write your story, make impactful words.";
  });
});
</script>

<template>
  <!-- Navbar - Share Story -->
  <nav
    class="fixed top-0 right-0 left-0 bg-white mx-4 mx-0 w-full z-90"
  >
    <div
      class="flex py-2 items-center justify-between lg:border-x-1 border-gray-200 pl-3 pr-5 wrapper mx-auto"
    >
      <!-- Logo -->
      <button
        class="w-150px h-auto cursor-pointer"
        onclick="window.location.href='/'"
        onmouseover="this.style.opacity='0.7'"
        onmouseout="this.style.opacity='1'"
      >
        <img
          src="/public/logo/btp.png"
          alt="beeyondthepages"
          class="w-150px h-auto"
        />
      </button>

      <!-- Profile and Notification Icons -->
      <ul class="grid grid-auto-flow-col items-center gap-5 relative">
        <li class="grid-col-[span_1] block group relative">
          <button 
            class="cursor-pointer relative transition-all duration-300 transform hover:scale-105 hover:rotate-6"
            @mouseover="this.style.opacity='0.7'" 
            @mouseout="this.style.opacity='1'"
            onclick="onPublihstory()"
          >
            <img
              src="/public/icon/publish.svg"
              alt="Publish"
              class="w-9 h-9"
            />
            <span
              class="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            >
              Publish Story
            </span>
          </button>
        </li>
        <li class="grid-col-[span_1] block group relative">
          <a href="/notification" class="flex items-center relative">
            <img
              src="/public/icon/notification.svg"
              alt="Notification"
              class="w-5 h-5 bell-swing object-cover"
            />
            <span class="notification-badge">11</span>
            <span
              class="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            >
              Notification
            </span>
          </a>
        </li>
        <li class="grid-col-[span_1] block group relative">
          <a href="/profile" class="flex items-center relative">
            <img
              src="/public/assets/jon-tyson-XzUMBNmQro0-unsplash.jpg"
              alt="Profile"
              class="w-7 h-7 object-cover rounded-full border border-gray-300"
            />
            <span
              class="absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            >
              Profile
            </span>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Content - Write Story -->
  <div class="grid-bg p-5 px-30">
    <!-- Title Input -->
    <input
      type="text"
      class="w-full text-[40px] font-sprat outline-none border-b-2 border-gray-300 p-2 bg-transparent"
      placeholder="Title"
    />
    <!-- Content Editable Div -->
    <div
      id="editor"
      contenteditable="true"
      class="mt-4 text-gray-700 w-full min-h-screen outline-none p-2 placeholder"
      data-placeholder="Write your story, make impactful words."
    ></div>
  </div>
</template>

<style scoped>
.grid-bg {
  --opacity: 0.75;
  --gray: rgb(229 231 235 / var(--opacity)); /* gray-200 */
  background-image: linear-gradient(to right, var(--gray) 1px, transparent 1px),
    linear-gradient(to bottom, var(--gray) 1px, transparent 1px);
  background-repeat: repeat;
  background-position: -10px -10px;
  background-size: 20px 20px;
}

.placeholder:empty::before {
  content: attr(data-placeholder);
  color: rgb(156 163 175); /* gray-400 */
  font-style: italic;
}

.placeholder {
  font-size: 16px; /* Adjust this value to your desired font size */
}

/* Notification Badge */
.notification-badge {
  position: absolute;
  top: -0.5rem; /* Position above */
  right: -0.5rem; /* Position to the right */
  color: rgb(220, 60, 60); /* White text */
  font-size: 0.65rem; /* Small font size */
  width: 1rem; /* Circle diameter */
  height: 1rem; /* Circle diameter */
  border-radius: 50%; /* Circular shape */
  display: flex;
  align-items: center; /* Center text vertically */
  justify-content: center; /* Center text horizontally */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Slight shadow */
}

/* Hover Effect */
.group:hover .absolute {
  opacity: 100;
}
</style>
