<template>
  <div>
    <el-card shadow="always">
      <el-form v-model="registerForm" label-position="top">
        <el-form-item label="Login">
          <AppInputErrorMessage v-if="isRegisterFormValid.username">{{
            errorMessage
          }}</AppInputErrorMessage>
          <el-input v-model="registerForm.username" />
        </el-form-item>
        <el-form-item label="Email">
          <AppInputErrorMessage v-if="isRegisterFormValid.email">{{
            errorMessage
          }}</AppInputErrorMessage>
          <el-input v-model="registerForm.email" type="e-mail" />
        </el-form-item>
        <el-form-item label="Password">
          <AppInputErrorMessage v-if="isRegisterFormValid.password">{{
            errorMessage
          }}</AppInputErrorMessage>
          <el-input v-model="registerForm.password" type="password" />
        </el-form-item>
        <el-form-item label="Repeat password">
          <AppInputErrorMessage v-if="isRegisterFormValid.passwordRepeat">{{
            errorMessage
          }}</AppInputErrorMessage>
          <el-input v-model="registerForm.passwordRepeat" type="password" />
        </el-form-item>
        <el-button type="primary" @click.prevent="handleSubmitRegister">
          Register
        </el-button>
        <router-link
          to="/login"
          class="ml-4 text-sm text-primary-100 hover:text-primary-200 duration-200 cursor-pointer"
          >Login</router-link
        >
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import UserManager from "@/services/UserManager";
import type { RegisterFormValidation } from "@/types/types";

definePageMeta({
  layout: "login",
});

const errorMessage = ref("");

const registerForm = reactive({
  username: "",
  email: "",
  password: "",
  passwordRepeat: "",
});

const isRegisterFormValid = reactive({
  username: false,
  email: false,
  password: false,
  passwordRepeat: false,
});

async function handleSubmitRegister() {
  try {
    restartValidation();

    const { data } = await UserManager.registerUser(registerForm);
    const token = useCookie("token");
    const userId = useCookie("userId");

    token.value = data?.token;
    userId.value = data?.userId;

    await navigateTo("/");
  } catch (err) {
    const { response } = err as RegisterFormValidation;

    if (response.status === 400) {
      errorMessage.value = response.data.msg;
      isRegisterFormValid[response.data.type] = true;
    }
  }
}

function restartValidation() {
  isRegisterFormValid.username = false;
  isRegisterFormValid.email = false;
  isRegisterFormValid.password = false;
  isRegisterFormValid.passwordRepeat = false;
}
</script>
