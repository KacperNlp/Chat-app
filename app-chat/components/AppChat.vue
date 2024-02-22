<template>
  <section class="grow">
    <div
      class="overflow-y-scroll bg-gray-100 mt-2 p-4 duration-150"
      :style="{ height: chatHeight }"
      ref="chatRef"
    >
      <div
        v-for="({ username, message, userId }, key) in messages"
        :key="key"
        :class="{ 'is-logged-user': isLoggedUser(userId) }"
        class="my-4"
      >
        <div class="message inline-block rounded-md bg-slate-200 p-2 text-sm">
          <span v-if="!isLoggedUser(userId)">{{ username }}: </span>
          <span>{{ message }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ChatMessage } from "@/types/types";

interface Props {
  messages: ChatMessage[];
  chatHeight: string;
}

const store = useWebsiteStore();

defineProps<Props>();

const chatRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (chatRef.value) {
    setTimeout(() => {
      if (chatRef.value) chatRef.value.scrollTop = chatRef.value.scrollHeight;
    }, 100);
  }
});

function isLoggedUser(messageUserId: string) {
  return messageUserId === store.loggedUser.id;
}
</script>

<style lang="scss" scoped>
.is-logged-user {
  text-align: right;

  .message {
    background: #ddd;
  }
}
</style>
