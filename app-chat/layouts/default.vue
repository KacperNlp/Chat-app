<template>
  <el-container class="h-screen overflow-hidden">
    <div class="flex flex-row w-full">
      <aside
        class="fixed left-[-100%] md:relative md:left-0 h-full w-80 overflow-y-scroll duration-300 bg-gray-800"
        :class="{ 'is-visible': isChannelsListVisible }"
      >
        <AppChannelList />
      </aside>
      <div class="grow flex flex-col max-h-dvh">
        <main class="grow">
          <slot />
        </main>
        <el-footer
          class="flex items-center justify-center !h-24 bg-slate-700 text-xs text-gray-100"
        >
          <AppFooter />
        </el-footer>
      </div>
    </div>
    <AddChannelForm
      v-if="isAddChannelFormVisible"
      @close-form="handleClickCloseAddChannelForm"
    />
    <div class="fixed bottom-6 right-2 md:right-8 z-[99]">
      <el-button
        @click="handleClickOpenAddChannelForm"
        class="!text-xl"
        type="primary"
        :icon="ChatRound"
        size="large"
        circle
      />
    </div>
    <div class="fixed md:!hidden bottom-6 left-2 z-[99]">
      <el-button
        @click="handleClickToggleChannels"
        class="!text-xl"
        type="primary"
        :icon="Expand"
        size="large"
        circle
      />
    </div>
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
