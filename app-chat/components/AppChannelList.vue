<template>
  <div class="flex flex-col gap-8">
    <div v-for="channel in store.channels">
      <AppChannelCard
        :name="channel.name"
        :color="channel.color"
        :users="channel.addedUsers"
        :author-id="channel.author"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useWebsiteStore();
</script>
