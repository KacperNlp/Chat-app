<template>
  <div
    @click.prevent="handleClickOpenChannel"
    class="text-gray-200 cursor-pointer"
  >
    <div
      class="relative flex flex-row items-center gap-6 duration-200"
      :class="{ 'is-active': isSelectedChannel }"
    >
      <div class="relative min-w-20 max-w-20">
        <img
          src="/assets/first-post.jpg"
          :alt="name"
          class="w-full h-20 rounded-2xl object-cover"
        />
        <!-- If any user is online on chat -->
        <span
          class="absolute bottom-[-2px] right-[-2px] border-2 border-gray-50 bg-lime-500 rounded-full w-5 h-5"
        ></span>
      </div>
      <div class="text-fontColor-100 max-w-[80%] truncate">
        <span class="block font-semibold text-lg md:text-xl">
          {{ name }}
        </span>
        <span class="text-xs"
          >Last message example hello there hello there example dsfg dsfg
          dsfgdsfgdsgf</span
        >
        <span class="flex items-center gap-1 absolute top-0 right-0 text-xs"
          ><el-icon><User /></el-icon> {{ numberOfUsers }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";

interface Props {
  name: string;
  users: string[];
  authorId: string;
  color: string;
  id: string;
}

const userId = useCookie("userId");
const router = useRouter();

const props = defineProps<Props>();

const numberOfUsers = computed(() => props.users.length + 1);
const isUserChannel = computed(() => props.authorId === userId.value);
const isSelectedChannel = computed(
  () => props.id === router.currentRoute.value.params.id
);

function handleClickOpenChannelSettings() {
  navigateTo(`/channel/edit/${props.id}`);
}

function handleClickOpenChannel() {
  navigateTo(`/channel/${props.id}`);
}
</script>

<style scoped>
.is-your-channel {
  border-color: #409eff;
}

.is-active {
  opacity: 1;
}
</style>
