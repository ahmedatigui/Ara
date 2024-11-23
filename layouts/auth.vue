<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
</script>

<template>
  <main class="min-h-screen bg-gray-50 text-gray-800">
    <header class="bg-white shadow">
      <NavigationMenu class="container mx-auto flex items-center justify-between py-4 px-6">
        <NavigationMenuList class="flex items-center space-x-4">
          <NavigationMenuItem>
            <NuxtLink to="/" class="text-gray-700 hover:text-gray-900">
              <NavigationMenuLink :class="navigationMenuTriggerStyle()">Home</NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
          <!-- <NavigationMenuItem>
            <NuxtLink to="/write" class="text-gray-700 hover:text-gray-900">
              <NavigationMenuLink :class="navigationMenuTriggerStyle()">Write</NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem> -->
          <NavigationMenuItem>
            <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900">
              <NavigationMenuLink :class="navigationMenuTriggerStyle()">About</NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
    <section class="container mx-auto px-6 py-8">
      <slot />
    </section>
  </main>
</template>

<style scoped>
/*html {
  font-family: "Inter"
}*/

.logout {
  margin-left: 1rem;
}

.displayName {
  margin-left: 1rem;
}
</style>
