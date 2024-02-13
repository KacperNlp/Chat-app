<template>
  <div>
    <AppPageTitle>Kanał!</AppPageTitle>
    <AppChat :messages="dummyData" />
  </div>
</template>

<script setup lang="ts">
import socket from "~/socket.io";

const router = useRouter();
const userId = useCookie("userId");

const dummyData = [
  {
    user: "Adam",
    text: "Hello, how are you?",
  },
  {
    user: "John",
    text: "Thanks, fine. And you?",
  },
];

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
