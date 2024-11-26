<script setup lang="ts">

const user = useSupabaseUser()
const layout = computed(() => user?.value ? "auth" : "unauth");
</script>
<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
