<template>
  <AppLayer>
    <el-card class="relative">
      <el-button
        @click="handleClickCloseSearch"
        class="absolute top-0 right-0"
        type="danger"
        :icon="Close"
      />
      <el-form label-position="top">
        <el-form-item :label="$t('home.search')">
          <el-input v-model="searchValue" />
        </el-form-item>
      </el-form>
      <el-button @click="handleClickClearSearch">Clear</el-button>
    </el-card>
  </AppLayer>
</template>

<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";

const store = useWebsiteStore();

const searchValue = ref(store.searchValue);

const emit = defineEmits(["closeSearch"]);

function handleClickCloseSearch() {
  emit("closeSearch");
}

function handleClickClearSearch() {
  searchValue.value = "";
}

watch(searchValue, (newValue) => {
  store.updateSearchValue(newValue);
});
</script>
