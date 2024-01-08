<template>
  <div>
    <el-card shadow="always">
      <el-form v-model="registerForm" label-position="top">
        <el-form-item label="Login">
          <el-input v-model="registerForm.username" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="registerForm.email" type="e-mail" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="registerForm.password" type="password" />
        </el-form-item>
        <el-form-item label="Repeat password">
          <el-input v-model="registerForm.passwordRepeat" type="password" />
        </el-form-item>
        <el-button type="primary" @click.prevent="handleSubmitRegister">
          Login
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import UserManager from "@/services/UserManager";

const registerForm = ref({
  username: "",
  email: "",
  password: "",
  passwordRepeat: "",
});

async function handleSubmitRegister() {
  console.log("Register");
  await UserManager.registerUser(registerForm.value);
}
</script>
