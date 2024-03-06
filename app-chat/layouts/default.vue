<template>
  <el-container class="overflow-x-hidden">
    <div class="flex flex-row w-full">
      <div class="grow flex flex-col max-h-dvh">
        <main class="grow">
          <slot />
        </main>
      </div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import socket from "~/socket.io";

const userId = useCookie("userId");
const store = useWebsiteStore();

onBeforeUnmount(() => {
  socket.disconnect();
});

socket.auth = { username: userId.value };
socket.connect();

if (!!userId.value)
  await Promise.all([
    store.fetchChannelsList(userId.value),
    store.fetchAllUsers(),
    store.fetchLoggedUserData(userId.value),
  ]);
</script>
