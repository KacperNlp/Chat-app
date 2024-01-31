<template>
  <main>
    <AppPageTitle class="mb-3 text-center">{{ $t("home.title") }}</AppPageTitle>
    <el-form v-model="channelForm" label-position="top">
      <el-form-item :label="$t('home.form.name')">
        <el-input v-model="channelForm.name" />
      </el-form-item>
      <el-form-item :label="$t('home.form.color')">
        <el-input v-model="channelForm.color" type="color" />
      </el-form-item>
      <el-form-item :label="$t('home.form.users')">
        <el-select
          v-model="channelForm.addedUsers"
          multiple
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="user in usersList"
            :key="user.username"
            :label="user.username"
            :value="user.id"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click.prevent="handleSubmitCreateNewChannel">{{
        $t("home.form.btn")
      }}</el-button>
    </el-form>
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
  color: "#000",
  author: userId.value as string,
  addedUsers: [],
});

const usersList = computed(() => {
  return store.users.filter((user) => user.id !== userId.value);
});

async function handleSubmitCreateNewChannel() {
  try {
    await ServerManager.addNewChannel(channelForm.value);
    await store.fetchChannelsList();
    channelForm.value.name = "";
    channelForm.value.color = "#000";
    channelForm.value.addedUsers = [];
  } catch {
    alert("Something goes wrong!");
  }
}

await Promise.all([store.fetchChannelsList(), store.fetchAllUsers()]);
console.log(store.users);
</script>
