<script setup lang="ts">
definePageMeta({
  title: 'Home Page',
  meta: [
    { name: 'description', content: 'Description of the home page.' }
  ]
});


const { data: apiData, error: apiError } = await useAsyncData('data', () => $fetch('/api/test'), {
  server: false
})
if (apiError) console.log(apiError)
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <!-- Blog List Header -->
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Blog Posts</h1>

    <!-- Blog Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in apiData?.blogs"
        :key="item.id"
        class="bg-white shadow-md rounded-lg p-6 border border-gray-200"
      >
        <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ item.title }}</h2>
        <p class="text-gray-500 text-sm mb-4">Created At: {{ new Date(item.created_at).toLocaleDateString() }}</p>
        <p class="text-gray-500 text-sm mb-4">Updated At: {{ new Date(item.updated_at).toLocaleDateString() }}</p>
        <p class="text-gray-500 text-sm mb-4">Author ID: {{ item.author_id }}</p>
        <NuxtLink
          :to="`/posts/${item.post_id}`"
          class="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
        >
          View Post &raquo;
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

