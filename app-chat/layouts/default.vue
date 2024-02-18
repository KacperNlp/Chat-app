<template>
  <el-container>
    <el-header class="fixed w-full bg-slate-50 z-10 flex">
      <AppHeader />
    </el-header>
    <el-main class="max-w-2xl mx-auto mt-32 w-10/12 min-h-screen">
      <slot />
    </el-main>
    <AddChannelForm
      v-if="isAddChannelFormVisible"
      @close-form="handleClickCloseAddChannelForm"
    />
    <el-button
      @click="handleClickOpenAddChannelForm"
      class="fixed bottom-6 right-6 z-[99] !text-xl"
      type="primary"
      :icon="ChatRound"
      size="large"
      circle
    />
    <el-footer class="flex items-center justify-center bg-gray-100">
      <AppFooter />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ChatRound } from "@element-plus/icons-vue";
import socket from "~/socket.io";

const userId = useCookie("userId");
const store = useWebsiteStore();

const isAddChannelFormVisible = ref(false);

onBeforeUnmount(() => {
  socket.disconnect();
});

function handleClickOpenAddChannelForm() {
  isAddChannelFormVisible.value = true;
}

function handleClickCloseAddChannelForm() {
  isAddChannelFormVisible.value = false;
}

socket.auth = { username: userId.value };
socket.connect();

if (!!userId.value) await store.fetchLoggedUserData(userId.value);
</script>
