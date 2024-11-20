<script setup lang="ts">
import { definePageMeta } from '#imports';

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
  <div>
    <AppAlert>
      This is an auto-imported component.
    </AppAlert>
    <!--<p>{{ JSON.stringify(apiData, null, 2) }}</p>-->
    <div>
      <div v-for="item in apiData?.blogs" :key="item.id">
        <h2>{{ item.title }}</h2>
        <NuxtLink :to="`/posts/${item.post_id}`">Post ID: {{ item.post_id }}</NuxtLink>
        <p>Created At: {{ item.created_at }}</p>
        <p>Updated At: {{ item.updated_at }}</p>
        <p>Author ID: {{ item.author_id }}</p>
      </div>
    </div>
  </div>
</template>
