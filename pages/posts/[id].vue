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
const postAuthor = ref();
const postLastEdit = ref();

useHead({
  title: `Post ${id}`,
  meta: [
    { name: 'description', content: `Description for post ${id}` }
  ]
});

const { data: routeData } = await useFetch('/test')

const { data: apiData, error: apiError, status } = await useAsyncData(`post/${id}`, () => $fetch(`/api/search/posts?query=${id}`), {
  server: true
})

const dataFound = (status.value === "success") && apiData?.value?.found && apiData.value && apiData?.value?.blogs;

console.log(status, apiData?.value?.found)

if (dataFound) {
  if (apiData?.value?.blogs) console.log("post data model: ", apiData?.value?.blogs[0].content);
  postContent.value = ((status.value === "success") && apiData?.value?.found && apiData.value && apiData?.value?.blogs) ? apiData?.value?.blogs[0].content : "No such post found";
  postAuthor.value = ((status.value === "success") && apiData?.value?.found && apiData.value && apiData?.value?.blogs) ? apiData?.value?.blogs[0].author_username : "No such user found";
  postLastEdit.value = ((status.value === "success") && apiData?.value?.found && apiData.value && apiData?.value?.blogs) ? apiData?.value?.blogs[0].updated_at : "No such post found";

}
if (apiError) console.log(apiError)


console.log("Sie: ", postContent, postAuthor, postLastEdit)
console.log(apiData)

</script>

<template>

  <div v-if="dataFound" class="container mx-auto px-6 py-8">
    <ClientOnly fallback-tag="span" fallback="Loading editor...">
      <!-- Post Metadata -->
      <div class="bg-gray-100 text-gray-700 p-4 rounded-lg mb-6">
        <p class="text-sm">
          <strong>Post By:</strong>
          <NuxtLink :to="`/profile/${postAuthor}`" class="hover:underline">{{ postAuthor }}</NuxtLink>
        </p>
        <p class="text-sm">
          <strong>Updated At:</strong> {{ new Date(postLastEdit).toLocaleString() }}
        </p>
      </div>

      <!-- Viewer Component -->
      <div class="bg-white shadow-md rounded-lg border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Post Content</h2>
        <Viewer v-if="dataFound" :modelValue="JSON.parse(postContent)" placeholder="Loading post content..."
          :readonly="true" class="min-h-[200px]" />
      </div>
    </ClientOnly>
  </div>
</template>
