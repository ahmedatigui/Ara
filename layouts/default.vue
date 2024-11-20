<script setup lang="ts">

const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const isLoggedIn = user.value

const signOut = async () => {
  const { error } = await auth.signOut({ scope: 'local' })
  if (error) console.log(error)
}

</script>

<template>
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/write">Write</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts/1">Post 1</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/posts/2">Post 2</NuxtLink>
          </li>
          <li><button class="logout" v-if="isLoggedIn" @click="signOut">Sign Out</button></li>
        </ul>
      </nav>
    </header>
    <slot />
  </div>
</template>

<style>
html {
  font-family: "Inter"
}

.logout {
  position: absolute;
  top: 1%;
  right: 1%;
}
</style>
