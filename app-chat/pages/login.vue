<template>
  <div>
    <el-card shadow="always">
      <el-form v-model="loginForm" label-position="top">
        <el-form-item label="Login">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-button type="primary" @click.prevent="handleSubmitLogin">
          Login
        </el-button>
        <router-link
          to="/register"
          class="ml-4 text-sm text-primary-100 hover:text-primary-200 duration-200 cursor-pointer"
          >Register</router-link
        >
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import UserManager from "@/services/UserManager";

definePageMeta({
  layout: "login",
});

const loginForm = reactive({
  username: "",
  password: "",
});

async function handleSubmitLogin() {
  try {
    await UserManager.loginUser(loginForm);
  } catch (err) {
    console.log(err);
  }
}
</script>
