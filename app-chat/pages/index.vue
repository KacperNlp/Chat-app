<template>
  <main>
    <h1>ChatApp</h1>
    <el-form v-model="taskForm">
      <el-form-item label="Treść zadania">
        <el-input v-model="taskForm.content" />
      </el-form-item>
      <el-button type="primary" @click.prevent="handleSubmitAddTask"
        >Add task!</el-button
      >
    </el-form>
    <AppTasksList />
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ServerManager from "@/services/ServerManager";
import type { NewTaskInterface } from "@/types/types";

const store = useWebsiteStore();

const taskForm = ref<NewTaskInterface>({
  content: "",
  done: false,
});

async function handleSubmitAddTask() {
  try {
    await ServerManager.addNewTask(taskForm.value);
    await store.fetchTasks();
    taskForm.value.content = "";
  } catch {
    alert("Something goes wrong!");
  }
}

await store.fetchTasks();
</script>
