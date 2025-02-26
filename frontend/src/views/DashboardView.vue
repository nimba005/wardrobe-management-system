<template>
  <div>
    <h2>Dashboard</h2>
    <p>Welcome, {{ authStore.user?.name }}!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>
