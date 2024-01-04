<template>
  <el-container>
    <el-header>
      <AppHeader />
    </el-header>
    <el-main class="max-w-2xl mx-auto w-10/12">
      <slot />
    </el-main>
    <el-footer class="flex items-center justify-center bg-gray-100">
      <AppFooter />
    </el-footer>
  </el-container>
</template>
