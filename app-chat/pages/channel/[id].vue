<template>
  <div>
    <AppPageTitle>Kanał!</AppPageTitle>
    <AppChat :messages="messages" />
    <div>
      <el-input v-model="message" placeholder="Your message...">
        <template #append>
          <el-button :icon="DArrowRight" @click="handleClickSendMessage" />
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import socket from "~/socket.io";
import { DArrowRight } from "@element-plus/icons-vue";
import type { ChatMessage } from "@/types/types";

const router = useRouter();
const userId = useCookie("userId");

const message = ref("");
const messages = ref<ChatMessage[]>([]);

const data = {
  roomId: router.currentRoute.value.params.id,
  user: userId.value,
};

socket.on("receive-message", ({ message, user }) => {
  const newMessage = {
    user,
    text: message,
  };
  console.log(newMessage);
  console.log(messages);

  messages.value.push(newMessage);
});

onBeforeUnmount(() => {
  socket.emit("leaveRoom", data);
});

function joinRoom() {
  socket.emit("joinRoom", data);
}

function handleClickSendMessage() {
  const newMessage = {
    user: data.user as string,
    text: message.value,
  };

  socket.emit("send-message", { ...data, message: message.value });
  messages.value.push(newMessage);

  message.value = "";
}

joinRoom();
</script>
