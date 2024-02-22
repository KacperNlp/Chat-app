<template>
  <el-container class="h-screen overflow-hidden">
    <div class="flex flex-row w-full">
      <aside class="fixed md:static h-full w-80 overflow-y-scroll">
        <AppChannelList />
      </aside>
      <div class="grow flex flex-col max-h-dvh">
        <main class="grow">
          <slot />
        </main>
        <el-footer
          class="flex items-center justify-center !h-12 bg-gray-200 text-xs"
        >
          <AppFooter />
        </el-footer>
      </div>
    </div>
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

if (!!userId.value)
  await Promise.all([
    store.fetchChannelsList(userId.value),
    store.fetchAllUsers(),
    store.fetchLoggedUserData(userId.value),
  ]);
</script>
