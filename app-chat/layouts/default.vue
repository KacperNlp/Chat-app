<template>
  <el-container class="h-screen overflow-hidden">
    <div class="flex flex-row">
      <aside class="fixed md:static h-full overflow-y-scroll">
        <AppChannelList />
      </aside>
      <div>
        <main>
          <slot />
        </main>
        <el-footer class="flex items-center justify-center bg-gray-100">
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

if (!!userId.value) await store.fetchLoggedUserData(userId.value);
</script>
