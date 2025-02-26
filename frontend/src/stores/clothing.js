import { defineStore } from "pinia";
import axios from "../api";

export const useClothingStore = defineStore("clothing", {
    state: () => ({
        items: [],
        searchQuery: "",
        selectedCategory: "",
    }),
    actions: {
        async fetchItems() {
            const params = {};
            if (this.searchQuery) params.search = this.searchQuery;
            if (this.selectedCategory) params.category = this.selectedCategory;

            const response = await axios.get("/clothings", { params });
            this.items = response.data;
        },
        async addItem(item) {
            await axios.post("/clothings", item);
            this.fetchItems();
        },
        async updateItem(id, updatedData) {
            await axios.put(`/clothings/${id}`, updatedData);
            this.fetchItems();
        },
        async deleteItem(id) {
            await axios.delete(`/clothings/${id}`);
            this.fetchItems();
        },
        setSearchQuery(query) {
            this.searchQuery = query;
            this.fetchItems();
        },
        setCategory(category) {
            this.selectedCategory = category;
            this.fetchItems();
        }
    },
});
