<!-- src/components/ReloadPrompt.vue -->
<script lang="ts" setup>
import { ref } from "vue";
import { registerSW } from "virtual:pwa-register";

const updateAvailable = ref(false);

// Register service worker
const updateSW = registerSW({
  onNeedRefresh() {
    updateAvailable.value = true;
  }
});

const update = () => {
  updateSW();
  updateAvailable.value = false;
};
</script>

<template>
  <div v-if="updateAvailable" class="update-prompt">
    <p>New version available!</p>
    <button @click="update">Update now</button>
  </div>
</template>

<style scoped>
.update-prompt {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>