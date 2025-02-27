<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <div class="app-container">
    <!-- Navbar -->
    <nav class="bg-gray-900 text-white py-6 shadow-md w-full">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo -->
        <h1 class="text-3xl font-bold tracking-wide uppercase">Wardrobe Management</h1>

        <!-- Navigation Links -->
        <div class="flex gap-8 text-lg font-medium ml-auto">
          <router-link to="/" class="hover:text-yellow-400 transition">Home</router-link>
          <router-link to="/about" class="hover:text-yellow-400 transition">About</router-link>

          <template v-if="!authStore.token">
            <router-link to="/login" class="hover:text-yellow-400 transition">Login</router-link>
            <router-link to="/register" class="hover:text-yellow-400 transition">Register</router-link>
          </template>

          <template v-else>
            <router-link to="/dashboard" class="hover:text-yellow-400 transition">Dashboard</router-link>
            <button @click="logout" class="bg-red-500 px-5 py-2 rounded-md hover:bg-red-600">
              Logout
            </button>
          </template>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Ensure full-page layout */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height */
  width: 100vw; /* Full width */
  overflow: hidden;
}

.content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
}

/* Navbar styles */
nav a {
  text-decoration: none;
}

nav a.router-link-active {
  color: #facc15;
}
</style>
