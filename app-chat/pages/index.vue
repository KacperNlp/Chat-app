<template>
  <main>
    <AppChannelList class="my-16" />
  </main>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import ServerManager from "@/services/ServerManager";
import type { NewChannelInterface } from "@/types/types";

const store = useWebsiteStore();
const userId = useCookie("userId");

const channelForm = ref<NewChannelInterface>({
  name: "",
  color: "#000000",
  author: userId.value as string,
  addedUsers: [],
});

const usersList = computed(() => {
  return store.users.filter((user) => user.id !== userId.value);
});

async function handleSubmitCreateNewChannel() {
  try {
    await ServerManager.addNewChannel(channelForm.value);
    if (!!userId.value) await store.fetchChannelsList(userId.value);
    channelForm.value.name = "";
    channelForm.value.color = "#000000";
    channelForm.value.addedUsers = [];
  } catch {
    alert("Something goes wrong!");
  }
}

if (!!userId.value)
  await Promise.all([
    store.fetchChannelsList(userId.value),
    store.fetchAllUsers(),
  ]);
</script>
