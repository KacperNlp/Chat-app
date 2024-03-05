<template>
  <div class="h-full flex flex-col">
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
  </div>
</template>

<script setup lang="ts">
import { FilterTypes } from "@/enums/enums";

const selectedFilter = ref<FilterTypes>(FilterTypes.All);

function isFilterSelected(filterType: FilterTypes) {
  return selectedFilter.value === filterType;
}
</script>

<style scoped>
.is-active {
  background-color: #1e68d7;
  color: #fefefe;
}
</style>
