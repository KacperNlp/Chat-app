<template>
  <div>
    <el-card shadow="always">
      <el-form v-model="loginForm" label-position="top">
        <el-form-item label="Login">
          <AppInputErrorMessage v-if="isRegisterFormValid.username">
            {{ errorMessage }}
          </AppInputErrorMessage>
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="Password">
          <AppInputErrorMessage v-if="isRegisterFormValid.password">
            {{ errorMessage }}
          </AppInputErrorMessage>
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
import type { LoginFormValidation } from "@/types/types";

definePageMeta({
  layout: "login",
});

const errorMessage = ref("");

const loginForm = reactive({
  username: "",
  password: "",
});

const isRegisterFormValid = reactive({
  username: false,
  password: false,
});

async function handleSubmitLogin() {
  try {
    const { data } = await UserManager.loginUser(loginForm);
    const token = useCookie("token");
    const userId = useCookie("userId");

    token.value = data?.token;
    userId.value = data?.userId;

    await navigateTo("/");
  } catch (err) {
    const { response } = err as LoginFormValidation;

    if (response.status === 400) {
      errorMessage.value = response.data.msg;
      isRegisterFormValid[response.data.type] = true;
    }
  }
}
</script>
