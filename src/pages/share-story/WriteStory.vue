<script setup>
import Editor from "@tinymce/tinymce-vue";
</script>

<template title="Write a Blog">
  <div class="mt-5 grid-bg">
    <Editor
      api-key="foboe1xgo2dcmcppn03s7kz91t4gg36ysci16xi4zv96jrgq"
      :init="{
        plugins: [
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media',
        ],
        toolbar: 'undo redo | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        selector: 'textarea',
        // statusbar: false,
        content_css: 'transparent',
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
      }"
      initial-value="Write your story, make impactful words."
    />
    <!-- Publish Button -->
    <button class="justify-self-end mt-6 bg-blue-400 text-white px-6 py-2 rounded-md hover:bg-blue-400">
      Share
    </button>
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
</style>
