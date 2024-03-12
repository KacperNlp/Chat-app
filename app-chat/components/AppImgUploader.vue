<template>
  <div>
    <div class="w-20 h-20 rounded-2xl overflow-hidden">
      <img
        :src="imgSrc"
        alt="Upload image preview"
        class="min-w-full min-h-full object-cover"
      />
    </div>
    <el-form-item :label="$t('home.form.img')">
      <input type="file" accept="image/*" @change="handleUploadImage" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits(["imgUpload"]);

const imgFile = ref<File>();
const imgUrl = ref<string>();

const imgSrc = computed(() =>
  imgUrl.value ? imgUrl.value : "/placeholder.jpg"
);

function handleUploadImage(e: Event) {
  const target = e.target as HTMLInputElement;

  if (!target.files) return;
  const file = target.files[0];

  imgFile.value = file;

  imgUrl.value = URL.createObjectURL(file);
  emit("imgUpload", imgFile.value);
}
</script>
