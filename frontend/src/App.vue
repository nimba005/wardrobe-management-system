<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <!-- Navbar -->
  <nav class="bg-gray-900 text-white p-4 shadow-md">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <!-- Logo/Title -->
      <h1 class="text-xl font-bold">Wardrobe Management</h1>

      <!-- Navigation Links -->
      <div class="flex space-x-6">
        <router-link to="/" class="hover:text-gray-300">Home</router-link>
        <router-link to="/about" class="hover:text-gray-300">About</router-link>

        <template v-if="!authStore.token">
          <router-link to="/login" class="hover:text-gray-300">Login</router-link>
          <router-link to="/register" class="hover:text-gray-300">Register</router-link>
        </template>

        <template v-else>
          <router-link to="/dashboard" class="hover:text-gray-300">Dashboard</router-link>
          <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>

  <!-- Page Content -->
  <main class="p-4">
    <router-view />
  </main>
</template>

<style>
nav a {
  font-weight: 500;
  text-decoration: none;
}
nav a.router-link-active {
  color: #facc15; /* Highlight active link */
}
</style>
