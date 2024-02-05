<template>
  <div>
    <h1>Kanał!</h1>
  </div>
</template>

<script setup lang="ts">
import socket from "~/socket.io";

const store = useWebsiteStore();
const userId = useCookie("userId");

const privateChannelId = ref("123#12");

onBeforeUnmount(() => {
  socket.disconnect();
});

socket.auth = { username: userId.value };
socket.connect();
socket.emit("join-private-channel", privateChannelId.value);
</script>
