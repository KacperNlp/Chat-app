<template>
  <el-card shadow="always" :class="{ 'is-your-channel': isUserChannel }">
    <div class="relative flex flex-col">
      <p class="mb-2 font-semibold text-md md:text-lg xl:text-xl">{{ name }}</p>
      <div>
        <span>Users: {{ numberOfUsers }}</span>
      </div>
      <div v-if="isUserChannel" class="mt-2">
        <el-button
          type="danger"
          @click.prevent="handleClickOpenChannelSettings"
          >{{ $t("home.channel.btnSettings") }}</el-button
        >
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

const userId = useCookie("userId");

const props = defineProps<Props>();

const numberOfUsers = computed(() => props.users.length + 1);
const isUserChannel = computed(() => props.authorId === userId.value);

function handleClickOpenChannelSettings() {
  navigateTo(`/channel/edit/${props.id}`);
}

function handleClickOpenChannel() {
  navigateTo(`/channel/${props.id}`);
}
</script>

<style scoped>
.is-your-channel {
  border-color: #409eff;
}
</style>
