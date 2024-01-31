<template>
  <el-card shadow="always">
    <div class="relative flex flex-col">
      <p class="mb-2 font-semibold text-md md:text-lg xl:text-xl">{{ name }}</p>
      <div>
        <span>Users: {{ numberOfUsers }}</span>
      </div>
      <div
        class="absolute top-0 right-0 w-4 h-4 rounded-lg"
        :style="`background-color: ${color}`"
      ></div>
      <div class="flex justify-end mt-4">
        <el-button type="primary" @click.prevent="handleClickOpenChannel">{{
          $t("home.channel.btn")
        }}</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  users: string[];
  authorId: string;
  color: string;
  id: string;
}

const props = defineProps<Props>();

const numberOfUsers = computed(() => props.users.length);

function handleClickOpenChannel() {
  navigateTo(`/channel/${props.id}`);
}
</script>
