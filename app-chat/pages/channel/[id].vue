<template>
  <div>
    <h1>Kanał!</h1>
  </div>
</template>

<script setup lang="ts">
import socket from "~/socket.io";

const router = useRouter();
const userId = useCookie("userId");

const data = {
  roomId: router.currentRoute.value.params.id,
  user: userId.value,
};

onBeforeUnmount(() => {
  socket.emit("leaveRoom", data);
});

function joinRoom() {
  socket.emit("joinRoom", data);
}

joinRoom();
</script>
