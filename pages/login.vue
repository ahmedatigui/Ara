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
    navigateTo('/')
  }
})
</script>
<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Log In!</h2>
          <form method="post" @submit.prevent="login">
            <div v-if="errorMessage">
              <span>{{ errorMessage }}</span>
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
              <button type="submit" class="button is-dark is-fullwidth">Log In</button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            Don't have an account? <NuxtLink to="/signup">Sign up</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
