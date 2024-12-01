<script setup lang="ts">                                                                                                                                                                    
const user = useSupabaseUser()                                                                                                                                                              
const { auth } = useSupabaseClient()                                                                                                                                                        

const { data: AuthUser , error: AuthError } = await auth.getUser()

const signOut = async () => {                                                                                                                                                               
  const data = await auth.signOut()                                                                                                                                                         
  if (data?.error) console.log(error)                                                                                                                                                       
  else {                                                                                                                                                                                    
    user.value = null;                                                                                                                                                                      
    console.log(data, user.value)
    navigateTo('/login')
  }
}

if (user?.value) { console.log('User', user.value) }
console.log("AuthUser: ", AuthUser)

const isLoggedIn = ref(user?.value);
const isPopoverOpen = ref(false);

const { data: userData, error: apiError, status } = await useAsyncData('me', () => $fetch('/api/me'), {
  server: false
})
//const displayName = computed(() => userData?.value?.profile?.username ?? "No username");
const displayName = computed(() => user?.value?.user_metadata?.display_name ?? "No username");

console.log('User data', displayName);
console.log("UserData: ", userData, userData?.value?.profile?.username)

const togglePopover = () => {
  isPopoverOpen.value = !isPopoverOpen.value;
};

const navigationMenuTriggerStyle = () => 
  'px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-indigo-500';

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

      <!-- Write Link -->
      <li>
        <NuxtLink to="/write" class="text-gray-700 hover:text-gray-900">
          <span :class="navigationMenuTriggerStyle()">Write</span>
        </NuxtLink>
      </li>

      <!-- About Link -->
      <li>
        <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900">
          <span :class="navigationMenuTriggerStyle()">About</span>
        </NuxtLink>
      </li>

      <!-- User Menu -->
      <li v-if="isLoggedIn" class="relative">
        <button
          @click="togglePopover"
          class="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
        >
          <span>{{ displayName }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M5.292 7.293a1 1 0 011.415 0L10 10.586l3.293-3.293a1 1 0 011.415 1.414l-4 4a1 1 0 01-1.415 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Popover Content -->
        <div
          v-if="isPopoverOpen"
          class="absolute right-0 mt-2 w-40 p-4 bg-white shadow-lg rounded-lg z-10"
        >
          <div class="flex flex-col space-y-2">
            <NuxtLink
              :to="`/profile/${displayName}`"
              class="text-sm text-gray-700 font-medium hover:underline"
            >
              {{ displayName }}
            </NuxtLink>
            <button
              @click="signOut"
              class="text-sm text-red-600 bg-red-100 hover:bg-red-200 py-2 px-4 rounded-lg w-full"
            >
              Sign Out
            </button>
          </div>
        </div>
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
