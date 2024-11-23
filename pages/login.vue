<script setup lang="ts">

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

const email = ref("")
const password = ref("")
const errorMessage = ref("")

const login = async () => {
  errorMessage.value = "";
  try {
    const { data, error } = await auth.signInWithPassword({
      email: `${email.value}`,
      password: `${password.value}`,
    })
    if (error) throw error;
    console.log(data)
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) errorMessage.value = error.message
  }
}

watchEffect(() => {
  if (user.value) {
    console.log(user.value)
    navigateTo('/')
  }
})
</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full border border-gray-200">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Log In!</h2>

      <form method="post" @submit.prevent="login" class="space-y-6">
        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 text-red-600 p-4 rounded-lg">
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Email Field -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            v-model="email"
            required
            placeholder="Enter your email"
            class="w-full"
          />
        </div>

        <!-- Password Field -->
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            v-model="password"
            required
            placeholder="Enter your password"
            class="w-full"
          />
        </div>

        <!-- Submit Button -->
        <div>
          <Button type="submit" variant="default" class="w-full">
            Log In
          </Button>
        </div>
      </form>

      <!-- Sign Up Link -->
      <div class="text-center mt-6 text-sm text-gray-600">
        Don't have an account? <NuxtLink to="/signup" class="text-indigo-600 hover:text-indigo-800 font-medium">Sign up</NuxtLink>
      </div>
    </div>
  </section>
</template>

