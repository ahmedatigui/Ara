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
  <div>
    <h1>Post {{ id }}</h1>
    <p>This is the post with ID: {{ id }}</p>
    <p>Wut</p>
    <code>{{ config.DB_WUT }}</code>
    <p>{{ JSON.stringify(apiData, null, 2) }}</p>
    <p>{{ routeData }}</p>
    <!-- <pre>{{apiData && apiData.value.blogs}}</pre>  -->
    <Viewer v-if="dataFound" :modelValue="JSON.parse(postContent)" placeholder="Loading post content..."
      :readonly="true" />
  </div>
</template>
