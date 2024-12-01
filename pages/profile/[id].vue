<script setup lang="ts">
import type { Database } from '@/types/database.types.ts'
const client = useSupabaseClient<Database>()

const route = useRoute();
const id = route.params.id;
const user = ref();
const posts = ref();

const { data: userData, error: apiError, status } = await useAsyncData(`profile/${id}`, () => $fetch(`/api/search/profiles?query=${id}`), {
  server: true
})

const dataFound = (status.value === "success") && userData?.value?.found && userData.value && userData?.value?.profile;

if (dataFound) {
  user.value = userData.value.profile;
  posts.value = userData.value.posts;
  console.log("USER: ", userData);
}

if (apiError) console.log(apiError)

</script>
<template>
  <section class="min-h-screen bg-gray-50 py-8">
    <div v-if="dataFound" class="container mx-auto px-6">
      <!-- User Info -->
      <div class="bg-white shadow-md rounded-lg p-8 border border-gray-200 flex flex-col items-center mb-8">
        <!-- Avatar -->
        <img :src="user.avatar" alt="User Avatar" class="w-24 h-24 rounded-full mb-4 shadow-md" />

        <!-- Username -->
        <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ user.username }}</h1>

        <!-- Short Description -->
        <p class="text-sm text-gray-600 text-center max-w-md">
          {{ user.description }}
        </p>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Posts by {{ user.username }}</h2>
        <div v-if="posts" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="item in posts" :key="item.id" class="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ item.title }}</h2>
            <!--<p class="text-gray-500 text-sm mb-4">Created At: {{ new Date(item.created_at).toLocaleDateString() }}</p>
        <p class="text-gray-500 text-sm mb-4">Updated At: {{ new Date(item.updated_at).toLocaleDateString() }}</p>-->
            <!--<p class="text-gray-500 text-sm mb-4">Author ID: {{ item.author_id }}</p>-->
            <NuxtLink :to="`/posts/${item.post_id}`" class="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
              View Post &raquo;
            </NuxtLink>
          </div>

        </div>
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
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h1>
        <p class="text-gray-600 text-center mb-6">
          The profile you’re looking for does not exist or may have been removed.
        </p>

        <!-- Go Back Button -->
        <NuxtLink to="/"
          class="text-indigo-600 hover:text-indigo-800 font-medium text-sm py-2 px-4 border border-indigo-600 rounded-lg">
          Go Back to Home
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
