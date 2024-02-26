<template>
  <section class="grow">
    <div
      class="overflow-y-scroll bg-gray-700 mt-2 p-4 duration-150"
      :style="{ height: chatHeight }"
      ref="chatRef"
    >
      <div
        v-for="({ username, message }, key) in messages"
        :key="key"
        class="flex items-center gap-4 my-4 border-t border-gray-500 pt-3"
      >
        <div>
          <el-avatar
            class="mr-3"
            :size="64"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <div class="flex flex-col text-gray-100">
          <div class="mb-2">
            <span class="text-xl">{{ username }}</span>
            <span class="ml-2 text-xs">22.03.2024</span>
          </div>
          <span class="text-sm">{{ message }}</span>
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

const props = defineProps<Props>();
console.log(props.messages);

const chatRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (chatRef.value) {
    setTimeout(() => {
      if (chatRef.value) chatRef.value.scrollTop = chatRef.value.scrollHeight;
    }, 100);
  }
});
</script>
