<template>
  <section class="grow bg-gray-200">
    <div
      class="flex flex-col-reverse overflow-y-scroll mt-2 p-4 duration-150"
      :style="{ maxHeight: chatHeight }"
      ref="chatRef"
    >
      <div class="flex flex-col">
        <div
          v-for="({ username, message, date, userId }, key) in messages"
          :key="key"
          class="flex items-center gap-2 md:gap-4 my-2 pt-2"
          :class="{ 'is-logged-user': isUserAuthorOfThisMessage(userId) }"
        >
          <div class="h-full flex flex-col justify-center gap-1 text-center">
            <el-avatar
              :size="isMobile"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
          <div class="flex flex-col text-gray-700">
            <div class="mb-1" v-if="!isUserAuthorOfThisMessage(userId)">
              <span class="text-xs md:text-base text-gray-400">{{
                username
              }}</span>
              <!-- <span class="ml-2 text-xs">{{ messageDateFormat(date) }}</span> -->
            </div>
            <div
              class="bg-gray-100 px-6 py-2 rounded-xl text-left"
              :class="{
                'bg-primary-300': isUserAuthorOfThisMessage(userId),
                'text-gray-50': isUserAuthorOfThisMessage(userId),
              }"
            >
              <span class="text-sm">{{ message }}</span>
            </div>
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

function isUserAuthorOfThisMessage(messageAuthorId: string) {
  return messageAuthorId === store.loggedUser.id;
}

function messageDateFormat(messageDate: Date) {
  if (!messageDate) return null;

  const date = new Date(messageDate);
  const monthValue = date.getMonth() + 1;

  const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();
  const month = monthValue <= 9 ? `0${monthValue}` : monthValue;

  return `${day}.${month}.${date.getFullYear()}`;
}
</script>

<style lang="scss">
.is-logged-user {
  flex-direction: row-reverse;
  text-align: right;
}
</style>
