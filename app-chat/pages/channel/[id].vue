<template>
  <div class="h-full flex flex-col bg-slate-600 text-gray-100">
    <AppPageTitle class="text-center pt-2" ref="channelTitle">{{
      currentChannelName
    }}</AppPageTitle>
    <AppChat :messages="messages" :chatHeight="channelHeight" />
    <div ref="messageInput" class="w-10/12 mx-auto py-4">
      <el-input v-model="message" :placeholder="$t('channel.input')">
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

const FOOTER_HEIGHT = 100;

const router = useRouter();
const userId = useCookie("userId");
const store = useWebsiteStore();

const message = ref("");
const messages = ref<ChatMessage[]>([]);
const channelTitle = ref<HTMLElement | null>(null);
const messageInput = ref<HTMLDivElement | null>(null);

const data = {
  roomId: router.currentRoute.value.params.id as string,
  userId: userId.value as string,
  username: store.loggedUser.username,
};

const currentChannelName = computed(() => {
  const currentChannel = store.channels.find(
    (channel) => channel._id === data.roomId
  );

  return currentChannel?.name;
});

const channelHeight = computed(() => {
  const channelTitleHeight = channelTitle.value?.$el.clientHeight;
  const messageInputHeight = messageInput.value?.clientHeight;

  if (!channelTitleHeight || !messageInputHeight) return "100%";

  const height =
    window.innerHeight -
    (channelTitleHeight + messageInputHeight + FOOTER_HEIGHT);
  return `${height}px`;
});

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
messages.value = await ChannelManager.getMessages(data.roomId);
</script>
