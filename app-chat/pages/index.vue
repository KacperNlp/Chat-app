<template>
  <div class="h-full flex flex-col">
    <section class="flex items-center justify-between px-4 py-4">
      <button
        @click="handleClickOpenAddChannelForm"
        class="flex items-center text-primary-300 text-xl"
      >
        <el-icon><CirclePlus /></el-icon>
      </button>
      <div class="flex gap-3">
        <el-button
          v-if="isChannelFiltersApplied"
          @click="handleClickClearFilters"
          >Clear</el-button
        >
        <button
          @click="handleClickOpenChannelSearch"
          class="flex items-center text-primary-300 text-xl"
        >
          <el-icon><Search /></el-icon>
        </button>
      </div>
    </section>
    <section class="w-full overflow-x-hidden flex flex-row gap-4 my-4 pl-4">
      <div
        v-for="filter in FilterTypes"
        class="px-4 py-1 rounded-lg duration-200"
        :class="{ 'is-active': isFilterSelected(filter) }"
      >
        <label :for="filter" class="text-fontColor-10 font-semibold">{{
          filter
        }}</label>
        <input
          v-model="selectedFilter"
          :id="filter"
          type="radio"
          name="visible-chats"
          :value="filter"
          class="hidden"
        />
      </div>
    </section>
    <section class="max-w-[100vw] px-4 pt-8 pb-12"><AppChannelList /></section>
    <AppChannelForm
      v-if="isAddChannelFormVisible"
      @closeForm="handleClickCloseAddChannelForm"
    />
    <AppSearchValue
      v-if="isSearchChannelVisible"
      @closeSearch="handleClickCloseChannelSearch"
    />
  </div>
</template>

<script setup lang="ts">
import socket from "~/socket.io";
import { Search, CirclePlus } from "@element-plus/icons-vue";
import { FilterTypes } from "@/enums/enums";

const store = useWebsiteStore();

const selectedFilter = ref<FilterTypes>(FilterTypes.All);
const isAddChannelFormVisible = ref(false);
const isSearchChannelVisible = ref(false);

const isChannelFiltersApplied = computed(() => !!store.searchValue);

socket.on("get-new-message", ({ message, userId, username, date, roomId }) => {
  const newMessage = {
    message,
    userId,
    username,
    date,
  };

  store.updateChannelLastMessage(newMessage, roomId);
});

function isFilterSelected(filterType: FilterTypes) {
  return selectedFilter.value === filterType;
}

function handleClickOpenAddChannelForm() {
  isAddChannelFormVisible.value = true;
}

function handleClickCloseAddChannelForm() {
  isAddChannelFormVisible.value = false;
}

function handleClickOpenChannelSearch() {
  isSearchChannelVisible.value = true;
}

function handleClickCloseChannelSearch() {
  isSearchChannelVisible.value = false;
}

function handleClickClearFilters() {
  store.updateSearchValue("");
}
</script>

<style scoped>
.is-active {
  background-color: #1e68d7;
  color: #fefefe;
}
</style>
