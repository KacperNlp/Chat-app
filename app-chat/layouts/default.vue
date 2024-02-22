<template>
  <el-container class="h-screen overflow-hidden">
    <div class="flex flex-row w-full">
      <aside
        class="fixed left-[-100%] md:static h-full w-80 overflow-y-scroll duration-300 bg-slate-200"
        :class="{ 'is-visible': isChannelsListVisible }"
      >
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
      class="fixed top-1 md:top-2 right-2 md:right-8 z-[99] !text-xl"
      type="primary"
      :icon="ChatRound"
      size="large"
      circle
    />
    <el-button
      @click="handleClickToggleChannels"
      class="fixed md:!hidden top-1 left-2 z-[99] !text-xl"
      type="primary"
      :icon="Expand"
      size="large"
      circle
    />
  </el-container>
</template>

<script setup lang="ts">
import { ChatRound, Expand } from "@element-plus/icons-vue";
import socket from "~/socket.io";

const userId = useCookie("userId");
const store = useWebsiteStore();

const isAddChannelFormVisible = ref(false);
const isChannelsListVisible = ref(false);

onBeforeUnmount(() => {
  socket.disconnect();
});

function handleClickOpenAddChannelForm() {
  isAddChannelFormVisible.value = true;
}

function handleClickCloseAddChannelForm() {
  isAddChannelFormVisible.value = false;
}

function handleClickToggleChannels() {
  isChannelsListVisible.value = !isChannelsListVisible.value;
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

<style scoped>
.is-visible {
  left: 0;
  z-index: 5;
}
</style>
