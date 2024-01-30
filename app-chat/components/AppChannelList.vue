<template>
  <div>
    <div v-for="channel in store.channels">
      <p>{{ channel.name }}</p>
      <div class="w-2 h-2" :style="`background-color: ${channel.color}`"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ServerManager from "@/services/ServerManager";

const store = useWebsiteStore();

async function handleClickDeleteTask(id: string) {
  try {
    await ServerManager.deleteTask(id);
    await store.fetchChannelsList();
  } catch {
    alert("Sorry we cannot remove this task!");
  }
}
</script>
