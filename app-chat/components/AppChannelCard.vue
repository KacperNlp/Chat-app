<template>
  <el-card shadow="always">
    <p>{{ name }}</p>
    <div>
      <span>Users: {{ numberOfUsers }}</span>
    </div>
    <div class="w-2 h-2" :style="`background-color: ${color}`"></div>
  </el-card>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  users: string[];
  authorId: string;
  color: string;
}

const props = defineProps<Props>();

const numberOfUsers = computed(() => props.users.length);
</script>
