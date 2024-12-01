<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
</script>

<template>
  <main class="min-h-screen bg-gray-50 text-gray-800">
    <header class="bg-white shadow">
      <nav class="container mx-auto flex items-center justify-center py-4 px-6">
    <ul class="flex items-center space-x-4">
      <!-- Home Link -->
      <li>
        <NuxtLink to="/" class="text-gray-700 hover:text-gray-900">
          <span :class="navigationMenuTriggerStyle()">Home</span>
        </NuxtLink>
      </li>
      <!-- About Link -->
      <li>
        <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900">
          <span :class="navigationMenuTriggerStyle()">About</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
    </header>
    <section class="container mx-auto px-6 py-8">
      <slot />
    </section>
  </main>
</template>

<style scoped>
.logout {
  margin-left: 1rem;
}

.displayName {
  margin-left: 1rem;
}
</style>
