<template>
  <div>
    <h1>{{ $t("user.dashboard") }}</h1>
    <div class="flex gap-2">
      <span>{{ $t("user.nick") }}</span>
      <span>{{ store.loggedUser.username }}</span>
    </div>
    <div class="flex gap-2">
      <span>{{ $t("E-mail:") }}</span>
      <span>{{ store.loggedUser.email }}</span>
    </div>
    <div class="flex gap-2">
      <span>{{ $t("user.role") }}</span>
      <span>{{ store.loggedUser.role }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useWebsiteStore();
const userId = useCookie<string>("userId");

await store.fetchLoggedUserData(userId.value);
</script>
