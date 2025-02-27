<script setup>
import { ref, computed, onMounted } from "vue";
import { useClothingStore } from "@/stores/clothing";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const clothingStore = useClothingStore();
const authStore = useAuthStore();
const router = useRouter();

const selectedCategory = ref("");
const searchQuery = ref("");
const newClothing = ref({ name: "", category: "tops", imageUrl: "" });
const editingItem = ref(null);
const errorMessage = ref("");

onMounted(() => {
  clothingStore.fetchItems();
});

const addClothing = async () => {
  if (!newClothing.value.name.trim() || !newClothing.value.imageUrl.trim()) {
    errorMessage.value = "Clothing name and image URL cannot be empty.";
    return;
  }
  await clothingStore.addItem(newClothing.value);
  newClothing.value = { name: "", category: "tops", imageUrl: "" };
  errorMessage.value = "";
};

const deleteClothing = async (id) => {
  await clothingStore.removeItem(id);
};

const editClothing = (item) => {
  editingItem.value = { ...item };
};

const updateClothing = async () => {
  if (!editingItem.value.name.trim() || !editingItem.value.imageUrl.trim()) {
    errorMessage.value = "Clothing name and image URL cannot be empty.";
    return;
  }
  await clothingStore.updateItem(editingItem.value);
  editingItem.value = null;
  errorMessage.value = "";
};

const filteredItems = computed(() => {
  return clothingStore.items.filter((item) => {
    const matchesCategory =
      selectedCategory.value === "" || item.category === selectedCategory.value;
    const matchesSearch =
      searchQuery.value === "" ||
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <main class="home-container">
    <h2 class="text-4xl font-bold text-center mb-6 text-white">Manage Your Wardrobe</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <input v-model="searchQuery" placeholder="Search clothes..." class="border p-3 rounded w-full shadow" />
      <select v-model="selectedCategory" class="border p-3 rounded w-full shadow">
        <option value="">All Categories</option>
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="shoes">Shoes</option>
      </select>
    </div>

    <div class="bg-gray-100 p-6 rounded shadow mb-6">
      <h2 class="text-2xl font-semibold mb-2">Add New Clothing</h2>
      <input v-model="newClothing.name" placeholder="Clothing Name" class="border p-3 w-full rounded mb-3 shadow" />
      <input v-model="newClothing.imageUrl" placeholder="Image URL" class="border p-3 w-full rounded mb-3 shadow" />
      <select v-model="newClothing.category" class="border p-3 w-full rounded mb-3 shadow">
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="shoes">Shoes</option>
      </select>
      <button @click="addClothing" class="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600">
        Add Clothing
      </button>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>

    <div v-if="filteredItems.length === 0" class="text-center text-white">No items found.</div>
    <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <li v-for="item in filteredItems" :key="item.id" class="border rounded p-6 shadow bg-white flex flex-col items-center">
        <img :src="item.imageUrl" alt="Clothing Image" class="w-full h-40 object-cover rounded mb-4 shadow" />
        <span class="font-semibold text-lg">{{ item.name }} - {{ item.category }}</span>
        <div class="flex gap-2 mt-3">
          <button @click="editClothing(item)" class="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600">
            Edit
          </button>
          <button @click="deleteClothing(item.id)" class="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </li>
    </ul>

    <div v-if="editingItem" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded shadow-lg">
        <h3 class="text-2xl font-bold mb-4">Edit Item</h3>
        <input v-model="editingItem.name" class="border p-3 w-full rounded mb-4 shadow" />
        <input v-model="editingItem.imageUrl" class="border p-3 w-full rounded mb-4 shadow" />
        <select v-model="editingItem.category" class="border p-3 w-full rounded mb-4 shadow">
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="shoes">Shoes</option>
        </select>
        <div class="flex gap-4">
          <button @click="updateClothing" class="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600">
            Save
          </button>
          <button @click="editingItem = null" class="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  width: 100vw;
  height: 100vh;
  padding: 20px;
  overflow-y: auto;
  background: url("/alejo-reinoso--IlmDnJg5cg-unsplash.jpg") center/cover no-repeat;
}
</style>
