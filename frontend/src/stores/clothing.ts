// src/stores/clothing.ts
import { defineStore } from "pinia";
import api from "../api";

export const useClothingStore = defineStore("clothing", {
  state: () => ({
    items: [],
    searchQuery: "",
    selectedCategory: "",
  }),
  actions: {
    async fetchItems() {
      try {
        const params: any = {};
        if (this.searchQuery) params.search = this.searchQuery;
        if (this.selectedCategory) params.category = this.selectedCategory;

        const response = await api.get("/clothings", { params });
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching clothing items:", error);
      }
    },
    async addItem(item: any) {
      try {
        await api.post("/clothings", item);
        this.fetchItems();
      } catch (error) {
        console.error("Error adding clothing item:", error);
      }
    },
    async updateItem(id: number, updatedData: any) {
      try {
        await api.put(`/clothings/${id}`, updatedData);
        this.fetchItems();
      } catch (error) {
        console.error("Error updating clothing item:", error);
      }
    },
    async deleteItem(id: number) {
      try {
        await api.delete(`/clothings/${id}`);
        this.fetchItems();
      } catch (error) {
        console.error("Error deleting clothing item:", error);
      }
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.fetchItems();
    },
    setCategory(category: string) {
      this.selectedCategory = category;
      this.fetchItems();
    }
  }
});
