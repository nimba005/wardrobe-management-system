<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">My Wardrobe</h2>

    <!-- Search & Filter Section -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <input
        v-model="searchQuery"
        placeholder="Search clothes..."
        @input="searchItems"
        class="border p-2 w-full md:w-1/3 rounded shadow focus:ring focus:ring-blue-300"
      />

      <select
        v-model="selectedCategory"
        @change="filterByCategory"
        class="border p-2 rounded shadow w-full md:w-1/4 focus:ring focus:ring-blue-300"
      >
        <option value="">All Categories</option>
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="shoes">Shoes</option>
      </select>

      <button
        @click="resetFilters"
        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        Reset Filters
      </button>
    </div>

    <!-- No Items Found Message -->
    <div v-if="clothingStore.items.length === 0" class="text-center text-gray-500 py-6">
      No clothing items found.
    </div>

    <!-- Clothing List -->
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <li
        v-for="item in clothingStore.items"
        :key="item.id"
        class="border rounded p-4 flex justify-between items-center shadow-lg hover:shadow-xl transition"
      >
        <span class="font-semibold text-gray-700">
          {{ item.name }} - <span class="text-blue-500">{{ item.category }}</span>
        </span>
        <button
          @click="deleteItem(item.id)"
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useClothingStore } from "@/stores/clothing";

const clothingStore = useClothingStore();
const searchQuery = ref("");
const selectedCategory = ref("");

// Search Function
const searchItems = () => {
  clothingStore.setSearchQuery(searchQuery.value);
};

// Filter by Category
const filterByCategory = () => {
  clothingStore.setCategory(selectedCategory.value);
};

// Reset Filters
const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  clothingStore.setSearchQuery("");
  clothingStore.setCategory("");
};

// Delete Item
const deleteItem = (id) => {
  clothingStore.deleteClothing(id);
};

onMounted(() => {
  clothingStore.fetchItems();
});
</script>
