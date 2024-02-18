<template>
  <AppLayer>
    <el-card class="relative">
      <span class="block mb-4 text-center">Stwórz kanał</span>
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
        <el-button
          type="primary"
          @click.prevent="handleSubmitCreateNewChannel"
          >{{ $t("home.form.btn") }}</el-button
        >
      </el-form>
      <el-button
        @click="handleClickCloseFrom"
        class="absolute top-0 right-0"
        type="danger"
        :icon="Close"
      />
    </el-card>
  </AppLayer>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import ServerManager from "@/services/ServerManager";
import { Close } from "@element-plus/icons-vue";
import type { NewChannelInterface } from "@/types/types";

const store = useWebsiteStore();
const userId = useCookie("userId");

const emit = defineEmits(["closeForm"]);

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
    emit("closeForm");
  } catch {
    alert("Something goes wrong!");
  }
}

function handleClickCloseFrom() {
  emit("closeForm");
}

if (!!userId.value)
  await Promise.all([
    store.fetchChannelsList(userId.value),
    store.fetchAllUsers(),
  ]);
</script>
