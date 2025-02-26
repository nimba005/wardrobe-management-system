<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
    <router-link v-if="authStore.token" to="/dashboard">Dashboard</router-link>
    <button v-if="authStore.token" @click="logout">Logout</button>
  </nav>
  <router-view />
</template>