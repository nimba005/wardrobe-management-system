import { defineStore } from "pinia";
import axios from "../api";

export const useClothingStore = defineStore("clothing", {
    state: () => ({ items: [] }),
    actions: {
        async fetchItems() {
            const response = await axios.get("/clothings");
            this.items = response.data;
        },
        async addItem(item) {
            await axios.post("/clothings", item);
            this.fetchItems();
        },
        async deleteItem(id) {
            await axios.delete(`/clothings/${id}`);
            this.fetchItems();
        }
    },
});
