<template>
  <section class="grow bg-gray-200">
    <div
      class="flex flex-col-reverse overflow-y-scroll mt-2 p-4 duration-150"
      :style="{ maxHeight: chatHeight }"
      ref="chatRef"
    >
      <div class="flex flex-col">
        <div
          v-for="({ username, message, date }, key) in messages"
          :key="key"
          class="flex items-center gap-4 my-4 pt-3"
        >
          <div>
            <el-avatar
              class="mr-3"
              :size="isMobile"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
          <div class="flex flex-col text-gray-700">
            <div class="mb-2">
              <span class="text-lg md:text-xl">{{ username }}</span>
              <span class="ml-2 text-xs">{{ messageDateFormat(date) }}</span>
            </div>
            <span class="text-sm">{{ message }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ChatMessage } from "@/types/types";

const MOBILE_AVATAR_SIZE = 32;
const DESKTOP_AVATAR_SIZE = 48;

interface Props {
  messages: ChatMessage[];
  chatHeight: string;
}

const store = useWebsiteStore();

defineProps<Props>();

const chatRef = ref<HTMLDivElement | null>(null);

const isMobile = ref(MOBILE_AVATAR_SIZE);

onMounted(() => {
  if (chatRef.value) {
    setTimeout(() => {
      if (chatRef.value) chatRef.value.scrollTop = chatRef.value.scrollHeight;
    }, 100);
  }

  isMobile.value =
    window.innerWidth <= 760 ? MOBILE_AVATAR_SIZE : DESKTOP_AVATAR_SIZE;
});

function messageDateFormat(messageDate: Date) {
  if (!messageDate) return null;

  const date = new Date(messageDate);

  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() <= 9 ? `0${date.getMonth()}` : date.getMonth();

  return `${day}.${month}.${date.getFullYear()}`;
}
</script>
