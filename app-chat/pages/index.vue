<template>
  <main>
    <h1>ChatApp</h1>
    <el-form v-model="taskForm">
      <el-form-item label="Treść zadania">
        <el-input v-model="taskForm.content" />
      </el-form-item>
      <el-button type="primary">Add task!</el-button>
    </el-form>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ServerManager from "@/services/ServerManager";
import type { TaskInterface } from "@/types/FormTypes";

const taskForm = ref<TaskInterface>({
  content: "",
});
const tasks = ref([]);

tasks.value = await ServerManager.getTasksList();
</script>
