<script setup lang="ts">
definePageMeta({
  title: 'Home Page',
  meta: [
    { name: 'description', content: 'Description of the home page.' }
  ]
});


const { data: apiData, error: apiError } = await useAsyncData('usersPosts', () => $fetch('/api/posts'), {
  server: false
})
if (apiError) console.log(apiError)
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <!-- Blog List Header -->
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Blog Posts</h1>

    <!-- Blog Cards -->
    <div v-if="apiData?.blogs.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in apiData?.blogs" :key="item.id"
        class="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ item.title }}</h2>
        <p class="text-gray-500 text-sm mb-4">Created At: {{ new Date(item.created_at).toLocaleDateString() }}</p>
        <p class="text-gray-500 text-sm mb-4">Updated At: {{ new Date(item.updated_at).toLocaleDateString() }}</p>
        <p class="text-gray-500 text-sm mb-4">Author: <NuxtLink :to="`/profile/${item.author_username}`"
            class="hover:underline">{{ item.author_username }}</NuxtLink>
        </p>
        <NuxtLink :to="`/posts/${item.post_id}`" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
          View Post &raquo;
        </NuxtLink>
      </div>
    </div>
    <div v-else>
      <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
        <!-- Error Icon -->
        <div class="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-red-600" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.172 9.172a4 4 0 015.656 0M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.071-.071a9.937 9.937 0 00-2.829-2.828M12 2.25v.01M2.25 12h.01M12 21.75v-.01M21.75 12h-.01" />
          </svg>
        </div>

        <!-- Error Message -->
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Posts Not Found</h1>
        <p class="text-gray-600 text-center mb-6">
          No posts have been written yet.
        </p>
      </div>
    </div>
  </div>
</template>
