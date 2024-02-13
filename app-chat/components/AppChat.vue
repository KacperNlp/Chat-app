<template>
  <section>
    <h2>Chat</h2>
    <div>
      <div v-for="(message, key) in messages" :key="key">
        {{ message.user }}
        {{ message.text }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ChatMessage } from "@/types/types";

interface Props {
  messages: ChatMessage[];
}

defineProps<Props>();
</script>
