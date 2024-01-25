<template>
  <div>
    <h1>Hello user!</h1>
  </div>
</template>

<script setup lang="ts">
const store = useWebsiteStore();
const userId = useCookie<string>("userId");

await store.fetchLoggedUserData(userId.value);
</script>
