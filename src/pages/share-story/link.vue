<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const blogContent = ref("");
const toolbar = ref(null);
const linkPopover = ref(null);
const isBigFont = ref(false);
const isLinkPopoverVisible = ref(false);
const hoveredLink = ref(""); // Untuk menyimpan link yang di-hover
const tooltip = ref(null);

onMounted(() => {
  const contentEditable = document.getElementById("editor");

  contentEditable.addEventListener("input", () => {
    blogContent.value = contentEditable.innerHTML.trim();
    contentEditable.dataset.placeholder = blogContent.value
      ? ""
      : "Write your story, make impactful words.";
  });

  contentEditable.addEventListener("mouseup", checkSelection);
  document.addEventListener("selectionchange", checkSelection);

  // Event listener untuk menampilkan popover link saat hover
  contentEditable.addEventListener("mouseover", handleMouseOver);
  contentEditable.addEventListener("mouseout", handleMouseOut);

  document.addEventListener("click", (event) => {
    if (
      !toolbar.value.contains(event.target) &&
      event.target !== contentEditable &&
      !linkPopover.value.contains(event.target)
    ) {
      hideToolbar();
      hideLinkPopover();
    }
  });
});

onUnmounted(() => {
  document.removeEventListener("selectionchange", checkSelection);
  document.removeEventListener("click", hideToolbar);
});

const checkSelection = () => {
  const selection = window.getSelection();
  if (!selection.rangeCount || selection.isCollapsed) {
    hideToolbar();
  } else {
    showToolbar();
  }
};

const showToolbar = () => {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  if (rect.width === 0 && rect.height === 0) return;

  const toolbarWidth = toolbar.value.offsetWidth || 100;
  const toolbarHeight = toolbar.value.offsetHeight || 40;

  let leftPosition = rect.left + window.scrollX + rect.width / 2 - toolbarWidth / 2 - 60;

  if (window.innerWidth <= 768) {
    leftPosition = rect.left + window.scrollX + rect.width / 2 - toolbarWidth / 2 + 60;
  }

  toolbar.value.style.top = `${rect.top + window.scrollY - toolbarHeight - 70}px`;
  toolbar.value.style.left = `${leftPosition}px`;

  toolbar.value.classList.remove("invisible");
  toolbar.value.classList.add("opacity-100");
};

const hideToolbar = () => {
  if (toolbar.value) {
    toolbar.value.classList.add("invisible");
    toolbar.value.classList.remove("opacity-100");
  }
};

const showLinkPopover = () => {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  if (rect.width === 0 && rect.height === 0) return;

  const popoverWidth = linkPopover.value.offsetWidth || 150;
  const popoverHeight = linkPopover.value.offsetHeight || 40;

  let leftPosition = rect.left + window.scrollX + rect.width / 2 - popoverWidth / 2 - 60;

  if (window.innerWidth <= 768) {
    leftPosition = rect.left + window.scrollX + rect.width / 2 - popoverWidth / 2 + 60;
  }

  linkPopover.value.style.top = `${rect.top + window.scrollY - popoverHeight - 70}px`;
  linkPopover.value.style.left = `${leftPosition}px`;

  isLinkPopoverVisible.value = true;
  hideToolbar();
};

const hideLinkPopover = () => {
  isLinkPopoverVisible.value = false;
  showToolbar();
};

const formatText = (command) => {
  document.execCommand("styleWithCSS", false, true);

  if (command === "big") {
    if (isBigFont.value) {
      document.execCommand("fontSize", false, "3");
    } else {
      document.execCommand("fontSize", false, "7");
    }
    isBigFont.value = !isBigFont.value;
  } else {
    document.execCommand(command, false, null);
  }
};

const addLink = () => {
  showLinkPopover();
};

// Menangani hover pada link
const handleMouseOver = (event) => {
  if (event.target.tagName === "A") {
    hoveredLink.value = event.target.href;
    showTooltip(event.target);
  }
};

// Menyembunyikan popover saat mouse keluar dari link
const handleMouseOut = (event) => {
  if (event.target.tagName === "A") {
    hideTooltip();
  }
};

// Menampilkan tooltip pada posisi yang sesuai
const showTooltip = (target) => {
  const rect = target.getBoundingClientRect();
  tooltip.value.style.top = `${rect.bottom + window.scrollY + 5}px`;
  tooltip.value.style.left = `${rect.left + window.scrollX}px`;
  tooltip.value.classList.remove("invisible");
  tooltip.value.classList.add("opacity-100");
};

// Menyembunyikan tooltip
const hideTooltip = () => {
  tooltip.value.classList.add("invisible");
  tooltip.value.classList.remove("opacity-100");
};
</script>

<template>
  <!-- Navbar - Share Story -->
  <nav
    class="fixed top-0 right-0 left-0 bg-white mx-0 w-full z-90"
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
            onclick="onPublihstory()"
          >
            <img
              src="/public/icon/publish.svg"
              alt="Publish"
              class="w-9 h-9"
            />
            <span
              class="absolute top-9 transform -translate-x-1/2,1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
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
              class="absolute top-full left-1/2 transform -translate-x-1/2,1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
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
              class="absolute top-full left-1/2 transform -translate-x-1/2,1 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            >
              Profile
            </span>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Content - Write Story -->
  <div class="grid-bg p-2 lg:p-5 px-5 lg:px-30">
    <!-- Title Input -->
    <input
      type="text"
      class="w-full text-[25px] lg:text-[40px] font-sprat border-b-2 border-gray-300 p-2 bg-transparent focus:ring-0 focus:outline-none"
      placeholder="Title"
    />
    <!-- Content Editable Div -->
    <div
      id="editor"
      contenteditable="true"
      class="mt-4 text-gray-700 w-full min-h-screen outline-none p-2 placeholder"
      data-placeholder="Write your story, make impactful words."
    ></div>
    <!-- Toolbar popover -->
    <div ref="toolbar" id="popover-default" role="tooltip" class="absolute z-10 invisible inline-block w-35 lg:w-50 text-4 lg:text-5 transition-opacity duration-300 bg-black border border-white rounded-lg shadow-xs opacity-0">
      <div class="flex flex-row px-3 py-2 text-white justify-between">
        <button @click="formatText('big')" class="relative transition-all duration-300 transform hover:scale-105 hover:rotate-16"><h2>T</h2></button>
        <button @click="formatText('bold')" class="relative transition-all duration-300 transform hover:scale-105 hover:rotate-16"><h2 class="font-bold">B</h2></button>
        <button @click="formatText('underline')" class="relative transition-all duration-300 transform hover:scale-105 hover:rotate-16"><h2 class="underline">U</h2></button>
        <button @click="formatText('italic')" class="relative transition-all duration-300 transform hover:scale-105 hover:rotate-16"><h2 class="italic">I</h2></button>
        <button @click="addLink" class="relative transition-all duration-300 transform hover:scale-105 hover:rotate-16"><img src="/public/icon/icons-link.ico" alt="link" class="w-3 lg:w-4 h-3 lg:h-4"/></button>
      </div>
      <div data-popper-arrow></div>
    </div>
    <!-- Link Input Popover -->
    <div v-show="isLinkPopoverVisible" ref="linkPopover" class="absolute z-10 text-xs inline-block w-45 lg:w-55 transition-opacity duration-300 bg-black border border-white rounded-lg shadow-xs opacity-100">
      <div class="flex flex-row px-3 py-2 text-white justify-between">
        <input v-model="linkInput" placeholder="Paste or type link" class="outline-none w-full"/>
        <button @click="hideLinkPopover" class="text-white relative transition-all duration-300 transform hover:scale-105 hover:rotate-16 ml-5">X</button>
      </div>
      <div data-popper-arrow></div>
    </div>
    <!-- Popover link hover -->
    <div
      ref="tooltip"
      id="tooltip-bottom"
      role="tooltip"
      class="absolute z-10 invisible px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-xs opacity-0"
    >
      {{ hoveredLink }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
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

#editor {
  font-family: sans-serif !important;
}

</style>
