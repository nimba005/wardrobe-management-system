import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any, // Explicitly type user as any, adjust based on actual user structure
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async register(userData: { name: string; email: string; password: string }) {
      const response = await axios.post("/api/register", userData);
      this.token = response.data.token;
      if (this.token) {
        localStorage.setItem("token", this.token);
      } else {
        localStorage.removeItem("token");
      }
      this.getUser();
    },
    async login(credentials: { email: string; password: string }) {
      const response = await axios.post("/api/login", credentials);
      this.token = response.data.token;
      if (this.token) {
        localStorage.setItem("token", this.token);
      } else {
        localStorage.removeItem("token");
      }
      this.getUser();
    },
    async getUser() {
      if (!this.token) return;
      try {
        const response = await axios.get("/api/user", {
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
        await axios.post("/api/logout", null, {
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
