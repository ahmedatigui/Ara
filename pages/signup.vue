<script setup lang="ts">
import { ref } from 'vue'

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

const displayname = ref("")
const description = ref("")
const email = ref("")
const password = ref("")
const successMessage = ref("")
const errorMessage = ref("")

const signup = async () => {
  successMessage.value = "";
  errorMessage.value = "";
  console.log('redirectTo', redirectTo)
  try {
    const { data, error } = await auth.signUp({
      email: `${email.value}`,
      password: `${password.value}`,
      options: {
        emailRedirectTo: redirectTo,
        data: {
          display_name: `${displayname.value}`,
        },
      },
    })
    if (error) throw error;
    console.log(data)
    successMessage.value = "Check your email for confirmation"
    if (data) {
      const apiData = await $fetch('/api/me', {
        method: 'POST',
        body: JSON.stringify({
          username: displayname.value,
          desc: description.value,
          email: email.value,
        })
      })

    }
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) errorMessage.value = error.message
  }
}


watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})

</script>

<template>
  <section class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full border border-gray-200">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up!</h2>

      <form method="post" @submit.prevent="signup" class="space-y-6">
        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 text-red-600 p-4 rounded-lg">
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 text-green-600 p-4 rounded-lg">
          <span>{{ successMessage }}</span>
        </div>

        <!-- Display Name Field -->
        <!--<div class="space-y-2">
          <label for="displayname" class="block text-sm font-medium text-gray-700">Display Name</label>
          <Input
            type="text"
            id="displayname"
            name="displayname"
            v-model="displayname"
            required
            placeholder="Enter your display name"
            class="w-full"
          />
        </div>-->

        <!--<div class="space-y-2">
    <label for="description" class="block text-sm font-medium text-gray-700">
      Short Description
    </label>

    <Textarea
      id="description"
      name="description"
      v-model="description"
      required
      placeholder="Tell us something about yourself"
      class="w-full"
    />
        </div>-->

        <!-- Email Field -->
        <!--<div class="space-y-2">
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
        </div>-->

        <!-- Password Field -->
        <!--<div class="space-y-2">
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
        </div>-->

        <!-- Submit Button -->
        <!--<div>
          <Button type="submit" variant="default" class="w-full">
            Sign Up
          </Button>
        </div>-->
        <!-- Display Name Field -->
        <div class="space-y-2">
          <label for="displayname" class="block text-sm font-medium text-gray-700">
            Display Name
          </label>
          <input type="text" id="displayname" name="displayname" v-model="displayname" required
            placeholder="Enter your display name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
        </div>

        <!-- Short Description Field -->
        <div class="space-y-2">
          <label for="description" class="block text-sm font-medium text-gray-700">
            Short Description
          </label>
          <textarea id="description" name="description" v-model="description" required
            placeholder="Tell us something about yourself"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"></textarea>
        </div>

        <!-- Email Field -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input type="email" id="email" name="email" v-model="email" required placeholder="Enter your email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
        </div>

        <!-- Password Field -->
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input type="password" id="password" name="password" v-model="password" required
            placeholder="Enter your password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm" />
        </div>

        <!-- Submit Button -->
        <div>
          <button type="submit"
            class="w-full px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Sign Up
          </button>
        </div>



      </form>

      <!-- Login Link -->
      <div class="text-center mt-6 text-sm text-gray-600">
        Already have an account? <NuxtLink to="/login" class="text-indigo-600 hover:text-indigo-800 font-medium">Login
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
