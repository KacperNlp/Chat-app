<template>
  <el-page-header
    class="max-w-5xl w-10/12 py-2 mx-auto"
    :icon="null"
    @back="handleClickPreviousePage"
  >
    <template #content>
      <button @click="handleClickVisitProfile" class="flex items-center">
        <el-avatar
          :size="32"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </button>
    </template>
    <template #extra>
      <div class="flex items-center">
        <div class="flex gap-3 text-sm mr-3">
          <router-link to="/" class="nav-link">{{
            $t("nav.dashboard")
          }}</router-link>
          <router-link to="/users" class="nav-link">{{
            $t("nav.users")
          }}</router-link>
        </div>
        <el-button @click="handleClickLogout" type="primary" class="ml-2">{{
          $t("logout")
        }}</el-button>
      </div>
    </template>
  </el-page-header>
</template>

<script setup lang="ts">
const router = useRouter();

function handleClickPreviousePage() {
  router.back();
}

function handleClickVisitProfile() {
  navigateTo("/user");
}

function handleClickLogout() {
  const token = useCookie("token");
  const userId = useCookie("userId");

  token.value = null;
  userId.value = null;

  navigateTo("/login");
}
</script>

<style scoped lang="scss">
.nav-link {
  opacity: 0.6;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }

  &.router-link-active {
    opacity: 1;
    color: #409eff;
  }
}
</style>
