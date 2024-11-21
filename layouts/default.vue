<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const signOut = async () => {
  const { error } = await auth.signOut()
  if (error) console.log(error)
  navigateTo('/login')
}

if (user?.value) { console.log('User', user) }
const isLoggedIn = user?.value
const { data, error } = await auth.getSession()
console.log("session data", data)
const displayName = data?.session?.user?.user_metadata?.display_name ?? "No username";
console.log('User data', displayName);
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
          <NavigationMenuItem>
            <NuxtLink to="/write" class="text-gray-700 hover:text-gray-900">
              <NavigationMenuLink :class="navigationMenuTriggerStyle()">Write</NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900">
              <NavigationMenuLink :class="navigationMenuTriggerStyle()">About</NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>

          <NavigationMenuItem v-if="isLoggedIn">
            <Popover>
              <PopoverTrigger>
                <Button variant="ghost" class="flex items-center space-x-2">
                  <span class="text-gray-700">{{ displayName }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.292 7.293a1 1 0 011.415 0L10 10.586l3.293-3.293a1 1 0 011.415 1.414l-4 4a1 1 0 01-1.415 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-40 p-4 bg-white shadow-lg rounded-lg">
                <div class="flex flex-col space-y-2">
                  <p class="text-sm text-gray-700 font-medium">{{ displayName }}</p>
                  <Button variant="destructive" class="w-full" @click="signOut">Sign Out</Button>
                </div>
              </PopoverContent>
            </Popover>
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
