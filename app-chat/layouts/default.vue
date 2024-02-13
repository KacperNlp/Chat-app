<template>
  <el-container>
    <el-header class="fixed w-full bg-slate-50 z-10 flex">
      <AppHeader />
    </el-header>
    <el-main class="max-w-2xl mx-auto mt-32 w-10/12 min-h-screen">
      <slot />
    </el-main>
    <el-footer class="flex items-center justify-center bg-gray-100">
      <AppFooter />
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import socket from "~/socket.io";

const userId = useCookie("userId");

onBeforeUnmount(() => {
  socket.disconnect();
});

socket.auth = { username: userId.value };
socket.connect();
</script>
