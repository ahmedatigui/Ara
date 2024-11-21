<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Database } from '@/types/database.types.ts'
import type { OutputData } from '@editorjs/editorjs';
import Viewer from '~/components/Viewer.vue';

const client = useSupabaseClient<Database>()
const config = useRuntimeConfig()
const route = useRoute();
const id = route.params.id;
console.log(route, id);

const postContent = ref();

useHead({
  title: `Post ${id}`,
  meta: [
    { name: 'description', content: `Description for post ${id}` }
  ]
});

const { data: routeData } = await useFetch('/test')

const { data: apiData, error: apiError, status } = await useAsyncData('data', () => $fetch(`/api/search/posts?query=${id}`), {
  server: false
})

const dataFound = (status.value === "success") && apiData?.value?.found && apiData.value && apiData?.value?.blogs;

console.log(status, apiData?.value?.found)

if (dataFound) {
  if (apiData?.value?.blogs) console.log("post data model: ", apiData?.value?.blogs[0].content);
  postContent.value = ((status.value === "success") && apiData?.value?.found && apiData.value && apiData?.value?.blogs) ? apiData?.value?.blogs[0].content : "No such post found";
}
if (apiError) console.log(apiError)


console.log(apiData)

</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <!-- Post Title -->
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Post {{ id }}</h1>

    <!-- Route Data -->
    <div class="bg-gray-100 text-gray-700 p-4 rounded-lg mb-6">
      <h2 class="text-lg font-medium mb-2">Route Data</h2>
      <p class="text-sm">{{ routeData }}</p>
    </div>

    <!-- Viewer Component -->
    <div class="bg-white shadow-md rounded-lg border border-gray-200 p-6">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Post Content</h2>
      <Viewer
        v-if="dataFound"
        :modelValue="JSON.parse(postContent)"
        placeholder="Loading post content..."
        :readonly="true"
        class="min-h-[200px]"
      />
    </div>

    <!-- Debugging Data (Optional) -->
    <div v-if="apiData" class="mt-6">
      <h3 class="text-md font-medium text-gray-700 mb-2">Debugging Data</h3>
      <pre class="bg-gray-50 text-sm text-gray-600 p-4 rounded-lg">
{{ JSON.stringify(apiData, null, 2) }}
      </pre>
    </div>
  </div>
</template>
