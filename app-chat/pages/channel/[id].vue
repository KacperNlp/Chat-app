<template>
  <div class="h-full flex flex-col bg-gray-50">
    <section class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center justify-between gap-4">
        <button @click="handleClickGoBack" class="text-lg text-primary-300">
          <el-icon><ArrowLeft /></el-icon>
        </button>
        <div class="flex items-center justify-between gap-3">
          <img
            src="/assets/first-post.jpg"
            :alt="currentChannel.name"
            class="w-11 h-11 rounded-2xl object-cover"
          />
          <div class="flex flex-col justify-center">
            <h1 class="text-sm font-semibold">{{ currentChannel.name }}</h1>
            <span class="text-[10px] text-gray-500"
              >Food and entertainment</span
            >
          </div>
        </div>
      </div>
      <button
        @click="handleClickCallToOnChannel"
        class="text-lg text-primary-300"
      >
        <el-icon><Phone /></el-icon>
      </button>
    </section>
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
import { ArrowLeft, Phone } from "@element-plus/icons-vue";
import type { ChatMessage } from "@/types/types";

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

const currentChannel = computed(() => {
  const currentChannel = store.channels.find(
    (channel) => channel._id === data.roomId
  );

  return currentChannel;
});

const channelHeight = computed(() => {
  const channelTitleHeight = channelTitle.value?.$el.clientHeight;
  const messageInputHeight = messageInput.value?.clientHeight;

  if (!channelTitleHeight || !messageInputHeight) return "100%";

  const height = window.innerHeight - (channelTitleHeight + messageInputHeight);
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

function handleClickGoBack() {
  router.back();
}

function handleClickCallToOnChannel() {
  console.log("Start call!");
}

joinRoom();
messages.value = await ChannelManager.getMessages(data.roomId);
</script>
