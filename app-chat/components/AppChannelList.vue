<template>
  <div class="flex flex-col">
    <div v-for="channel in store.channels">
      <AppChannelCard
        :name="channel.name"
        :color="channel.color"
        :users="channel.addedUsers"
        :author-id="channel.author"
        :id="channel._id"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useWebsiteStore();
</script>
