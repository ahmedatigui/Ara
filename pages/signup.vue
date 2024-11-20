<script setup lang="ts">
import { ref } from 'vue'

const user = useSupabaseUser()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}/confirm`

const displayname = ref("")
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
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Sign Up!</h2>
          <form method="post" @submit.prevent="signup">
            <div v-if="errorMessage">
              <span>{{ errorMessage }}</span>
            </div>
            <div v-if="successMessage">
              <span>{{ successMessage }}</span>
            </div>

            <div class="field">
              <label class="label">Display Name</label>
              <div class="control">
                <input type="text" class="input" name="displayname" v-model="displayname" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input type="email" class="input" name="email" v-model="email" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input type="password" class="input" name="password" v-model="password" required />
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">Sign Up</button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            Already have an account? <NuxtLink to="/login">Login</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
