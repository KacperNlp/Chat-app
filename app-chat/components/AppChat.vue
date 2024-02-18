<template>
  <section>
    <h2 class="text-center mt-4">Chat</h2>
    <div
      class="h-[60dvh] md:h-[60vh] overflow-y-scroll bg-gray-100 mt-8 p-4 rounded-t-xl"
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
}

const store = useWebsiteStore();

defineProps<Props>();

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
