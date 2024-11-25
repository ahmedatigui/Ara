<script setup lang="ts">
import type { Database } from '@/types/database.types.ts'
const client = useSupabaseClient<Database>()

const route = useRoute();
const id = route.params.id;
const user = ref();
const posts = ref();

const { data: userData, error: apiError, status } = await useAsyncData('data', () => $fetch(`/api/search/profiles?query=${id}`), {
  server: false
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
        <img
          :src="user.avatar"
          alt="User Avatar"
          class="w-24 h-24 rounded-full mb-4 shadow-md"
        />

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
      <div                                                                                                          
        v-for="item in posts"                                                                              
        :key="item.id"                                                                                              
        class="bg-white shadow-md rounded-lg p-6 border border-gray-200"                                            
      >                                                                                                             
        <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ item.title }}</h2>                                  
        <!--<p class="text-gray-500 text-sm mb-4">Created At: {{ new Date(item.created_at).toLocaleDateString() }}</p>
        <p class="text-gray-500 text-sm mb-4">Updated At: {{ new Date(item.updated_at).toLocaleDateString() }}</p>-->
        <!--<p class="text-gray-500 text-sm mb-4">Author ID: {{ item.author_id }}</p>-->
        <NuxtLink                                                                                                   
          :to="`/posts/${item.post_id}`"                                                                            
          class="text-indigo-600 hover:text-indigo-800 font-medium text-sm"                                         
        >                                                                                                           
          View Post &raquo;                                                                                         
        </NuxtLink>                                                                                                 
      </div>                                                                                                        

        </div>
      </div>
    </div>
  </section>
</template>

