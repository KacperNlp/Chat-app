<template>
  <div
    @click.prevent="handleClickOpenChannel"
    :class="{ 'is-active': isSelectedChannel }"
    class="p-4 border-b cursor-pointer duration-200"
  >
    <div class="relative flex flex-row items-center gap-4">
      <img
        src="/assets/first-post.jpg"
        :alt="name"
        class="w-12 h-12 rounded-xl"
      />
      <div>
        <span class="block font-semibold text-md md:text-lg xl:text-xl">
          {{ name }}
        </span>
        <span class="text-xs">Users: {{ numberOfUsers }}</span>
      </div>
      <div
        class="absolute top-0 right-0 w-4 h-4 rounded-lg"
        :style="`background-color: ${color}`"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
