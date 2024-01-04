<template>
  <div>
    <div v-for="task in store.tasks">
      <p>{{ task.content }}</p>
      <el-button
        type="danger"
        :icon="Delete"
        circle
        @click="handleClickDeleteTask(task._id)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import ServerManager from "@/services/ServerManager";

const store = useWebsiteStore();

async function handleClickDeleteTask(id: string) {
  try {
    await ServerManager.deleteTask(id);
    await store.fetchTasks();
  } catch {
    alert("Sorry we cannot remove this task!");
  }
}
</script>
