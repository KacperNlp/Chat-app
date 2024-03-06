<template>
  <div class="h-full flex flex-col">
    <section class="flex items-center justify-between px-4 py-4">
      <button
        @click="handleClickOpenAddChannelForm"
        class="flex items-center text-primary-300 text-xl"
      >
        <el-icon><CirclePlus /></el-icon>
      </button>
      <button class="flex items-center text-primary-300 text-xl">
        <el-icon><Search /></el-icon>
      </button>
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
      @close-form="handleClickCloseAddChannelForm"
    />
  </div>
</template>

<script setup lang="ts">
import { Search, CirclePlus } from "@element-plus/icons-vue";
import { FilterTypes } from "@/enums/enums";

const selectedFilter = ref<FilterTypes>(FilterTypes.All);
const isAddChannelFormVisible = ref(false);

function isFilterSelected(filterType: FilterTypes) {
  return selectedFilter.value === filterType;
}

function handleClickOpenAddChannelForm() {
  isAddChannelFormVisible.value = true;
}

function handleClickCloseAddChannelForm() {
  isAddChannelFormVisible.value = false;
}
</script>

<style scoped>
.is-active {
  background-color: #1e68d7;
  color: #fefefe;
}
</style>
