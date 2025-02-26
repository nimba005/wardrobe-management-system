<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useClothingStore } from "@/stores/clothing";

const clothingStore = useClothingStore();

// Form for adding clothes
const newClothing = ref({
  name: "",
  category: "tops",
});

// Editing state
const editingItem = ref(null);

// Search and filter states
const searchQuery = ref("");
const selectedCategory = ref("");

// Fetch items on load
onMounted(() => {
  clothingStore.fetchItems();
});

// Functions
const addClothing = async () => {
  if (newClothing.value.name.trim()) {
    await clothingStore.addItem(newClothing.value);
    newClothing.value = { name: "", category: "tops" }; // Reset form
  }
};

const deleteClothing = async (id) => {
  await clothingStore.deleteItem(id);
};

const editClothing = (item) => {
  editingItem.value = { ...item };
};

const updateClothing = async () => {
  if (editingItem.value) {
    await clothingStore.updateItem(editingItem.value.id, editingItem.value);
    editingItem.value = null;
  }
};

const searchItems = () => {
  clothingStore.setSearchQuery(searchQuery.value);
};

const filterByCategory = () => {
  clothingStore.setCategory(selectedCategory.value);
};
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Navigation -->
    <nav class="flex justify-center space-x-6 mb-6 text-lg">
      <router-link to="/" class="hover:text-gray-500">Home</router-link>
      <router-link to="/about" class="hover:text-gray-500">About</router-link>
      <router-link to="/login" class="hover:text-gray-500">Login</router-link>
      <router-link to="/register" class="hover:text-gray-500">Register</router-link>
    </nav>

    <!-- Page Header (Remove any duplicate headers in parent components) -->
    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold">Wardrobe Management</h1>
      <p class="text-gray-600 mt-2">Manage your clothes efficiently.</p>
    </div>

    <!-- Search & Filter -->
    <div class="flex gap-4 mb-6">
      <input
        v-model="searchQuery"
        placeholder="Search clothes..."
        @input="searchItems"
        class="border p-2 w-full rounded"
      />
      <select v-model="selectedCategory" @change="filterByCategory" class="border p-2 rounded">
        <option value="">All Categories</option>
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="shoes">Shoes</option>
      </select>
    </div>

    <!-- Add Clothing Form -->
    <div class="bg-gray-100 p-4 rounded shadow mb-6">
      <h2 class="text-xl font-semibold mb-2">Add New Clothing</h2>
      <input v-model="newClothing.name" placeholder="Clothing Name" class="border p-2 w-full rounded mb-2" />
      <select v-model="newClothing.category" class="border p-2 w-full rounded mb-2">
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="shoes">Shoes</option>
      </select>
      <button @click="addClothing" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
        Add Clothing
      </button>
    </div>

    <!-- Clothing List -->
    <div v-if="clothingStore.items.length === 0" class="text-center text-gray-500">
      No items found.
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <li
        v-for="item in clothingStore.items"
        :key="item.id"
        class="border rounded p-4 flex justify-between items-center shadow"
      >
        <span class="font-semibold">{{ item.name }} - {{ item.category }}</span>

        <div class="flex gap-2">
          <button @click="editClothing(item)" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
            Edit
          </button>
          <button @click="deleteClothing(item.id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Edit Modal -->
    <div v-if="editingItem" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <h3 class="text-xl font-bold mb-2">Edit Item</h3>
        <input v-model="editingItem.name" class="border p-2 w-full rounded mb-2" />
        <select v-model="editingItem.category" class="border p-2 w-full rounded mb-2">
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="shoes">Shoes</option>
        </select>
        <div class="flex gap-2">
          <button @click="updateClothing" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
            Save
          </button>
          <button @click="editingItem = null" class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
