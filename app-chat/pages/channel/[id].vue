<template>
  <div>
    <AppPageTitle class="text-center pt-2">Nazwa kanału</AppPageTitle>
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
import ChannelManager from "@/services/ChannelManager";
import type { ChatMessage } from "@/types/types";

const router = useRouter();
const userId = useCookie("userId");
const store = useWebsiteStore();

const message = ref("");
const messages = ref<ChatMessage[]>([]);

const data = {
  roomId: router.currentRoute.value.params.id as string,
  userId: userId.value as string,
  username: store.loggedUser.username,
};

socket.on("receive-message", ({ message, username, userId }) => {
  const newMessage = {
    username,
    userId,
    message,
  };

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
    userId: data.userId,
    username: data.username,
    message: message.value,
  };

  if (!message.value) return;

  socket.emit("send-message", { ...data, message: message.value });
  messages.value.push(newMessage);

  message.value = "";
}

joinRoom();
console.log(await ChannelManager.getMessages(data.roomId));
messages.value = await ChannelManager.getMessages(data.roomId);
</script>
