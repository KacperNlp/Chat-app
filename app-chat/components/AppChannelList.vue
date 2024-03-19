<template>
  <div class="flex flex-col gap-8">
    <div v-for="channel in store.filteredChannels">
      <AppChannelCard
        :name="channel.name"
        :img="channel.img"
        :users="channel.addedUsers"
        :author-id="channel.author"
        :id="channel._id"
        :lastMessage="channel.lastMessage"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const store = useWebsiteStore();
</script>
