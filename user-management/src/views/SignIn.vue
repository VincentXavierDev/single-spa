<template>
<MainLayout>
  <div class="size-full flex items-center justify-center bg-gray-100 px-4">
    <VToast />

    <div class="w-full max-w-md bg-white rounded-xl shadow p-6">
      <h2 class="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

      <div class="mb-4">
        <label class="block mb-1 text-sm font-medium text-gray-700">Tên đăng nhập</label>
        <VInputText v-model="formData.username" class="w-full" />
      </div>

      <div class="mb-6">
        <label class="block mb-1 text-sm font-medium text-gray-700">Mật khẩu</label>
        <VPassword v-model="formData.password" class="w-full" :feedback="false" toggleMask />
      </div>

      <VButton label="Đăng nhập" class="w-full" @click="handleLogin" />
    </div>
  </div>
</MainLayout>
  <LoadingOverlay v-model="showLoading" />
</template>

<script setup>

import MainLayout from "@/layout/MainLayout.vue";
import {navigateToUrl} from 'single-spa'
import {useToast} from "primevue/usetoast";
import {reactive, ref} from "vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";

const toast = useToast();

const formData = reactive({
  username: 'admin',
  password: 'admin'
})
const showLoading = ref(false);

const handleLogin = async () => {
  showLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1000))
  toast.add({ severity: 'success', summary: 'Thành công', detail: 'Đăng nhập thành công!', life: 2000 })
  showLoading.value = false;
  await new Promise(resolve => setTimeout(resolve, 1000))
  navigateToUrl('/main')
}
</script>

<style lang="scss" scoped>

</style>