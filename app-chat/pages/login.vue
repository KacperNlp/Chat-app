<template>
  <div>
    <el-card shadow="always" label-position="top">
      <el-form v-model="loginForm">
        <el-form-item label="Login">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-button type="primary" @click.prevent="handleSubmitLogin">
          Login
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const loginForm = ref({
  username: "",
  password: "",
});

function handleSubmitLogin() {
  console.log("Login");
}
</script>
