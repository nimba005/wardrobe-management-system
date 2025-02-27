// src/stores/auth.ts
import { defineStore } from "pinia";
import api from "../api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any, 
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async register(userData: { name: string; email: string; password: string }) {
      try {
        const response = await api.post("/register", userData);
        this.token = response.data.token;
        if (this.token) {
          localStorage.setItem("token", this.token);
        } else {
          localStorage.removeItem("token");
        }
        this.getUser();
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await api.post("/login", credentials);
        this.token = response.data.token;
        if (this.token) {
          localStorage.setItem("token", this.token);
        } else {
          localStorage.removeItem("token");
        }
        this.getUser();
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    async getUser() {
      if (!this.token) return;
      try {
        const response = await api.get("/user", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
        this.logout();
      }
    },
    async logout() {
      try {
        await api.post("/logout", null, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
      } catch (error) {
        console.error("Error logging out:", error);
      }
      this.token = null;
      localStorage.removeItem("token");
      this.user = null;
    },
  },
});
