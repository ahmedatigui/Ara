<script setup lang="ts">
import { computed } from "vue"

const user = useSupabaseUser()
const  layout = computed(() => user?.value ? "default" : "auth");
</script>
<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
