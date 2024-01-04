<template>
  <div>
    <el-card shadow="always">
      <el-form v-model="registerForm">
        <el-form-item label="Login">
          <el-input v-model="registerForm.login" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="registerForm.email" type="e-mail" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="registerForm.password" type="password" />
        </el-form-item>
        <el-form-item label="Repeat password">
          <el-input v-model="registerForm.repeatPassword" type="password" />
        </el-form-item>
        <el-button type="primary" @click.prevent="handleSubmitRegister">
          Login
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const registerForm = ref({
  login: "",
  email: "",
  password: "",
  repeatPassword: "",
});

function handleSubmitRegister() {
  console.log("Register");
}
</script>
