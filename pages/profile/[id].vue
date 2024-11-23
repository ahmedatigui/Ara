<template>
  <section class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-6">
      <!-- User Info -->
      <div class="bg-white shadow-md rounded-lg p-8 border border-gray-200 flex flex-col items-center mb-8">
        <!-- Avatar -->
        <img
          :src="user.avatar"
          alt="User Avatar"
          class="w-24 h-24 rounded-full mb-4 shadow-md"
        />

        <!-- Username -->
        <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ user.username }}</h1>

        <!-- Short Description -->
        <p class="text-sm text-gray-600 text-center max-w-md">
          {{ user.description }}
        </p>
      </div>

      <!-- User Posts -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Posts by {{ user.username }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="post in posts"
            :key="post.id"
            class="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <!-- Post Title -->
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ post.title }}</h3>

            <!-- Post Excerpt -->
            <p class="text-sm text-gray-600 mb-4">
              {{ post.excerpt }}
            </p>

            <!-- View Post Link -->
            <NuxtLink
              :to="`/posts/${post.id}`"
              class="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
            >
              Read More &raquo;
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

