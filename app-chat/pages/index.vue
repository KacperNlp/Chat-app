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
      <el-button type="primary" @click.prevent="handleSubmitAddTask">{{
        $t("home.form.btn")
      }}</el-button>
    </el-form>
    <AppTasksList />
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ServerManager from "@/services/ServerManager";
import type { NewChannelInterface } from "@/types/types";

const store = useWebsiteStore();
const userId = useCookie("userId");

const channelForm = ref<NewChannelInterface>({
  name: "",
  color: "",
  author: userId.value as string,
});

async function handleSubmitAddTask() {
  try {
    await ServerManager.addNewChannel(channelForm.value);
    await store.fetchChannelsList();
    channelForm.value.name = "";
    channelForm.value.color = "";
  } catch {
    alert("Something goes wrong!");
  }
}

await store.fetchChannelsList();
</script>
