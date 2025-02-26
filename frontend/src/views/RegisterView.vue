<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const name = ref("");
const email = ref("");
const password = ref("");
const authStore = useAuthStore();

const register = async () => {
  await authStore.register({ name: name.value, email: email.value, password: password.value });
};
</script>
