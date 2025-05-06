<template>
<MainLayout>
  <div class="size-full p-4 flex flex-col gap-2">
    <div class="text-right">
      <VButton label="Add" icon="pi pi-plus" @click="handleShowUser(null, 'create')" />
    </div>
    <DataView
        class="flex-1 overflow-auto"
        layout="grid"
        :value="itemsData"
        :paginator="false"
        :rows="10"
        item-template="itemTemplate"
    >
      <template #empty>
        <div class="size-full flex items-center justify-center">
          <h3>Không có dữ liệu!</h3>
        </div>
      </template>
      <template #grid="slotProps">
        <div class="grid grid-cols-12 gap-4">
          <div v-for="(user, index) in slotProps.items" :key="index" class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 p-2">
            <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
              <div class="bg-surface-50 flex justify-center rounded p-4">
                <div class="relative mx-auto">
                  <img class="rounded w-full" :src="user.image" :alt="user.name" style="max-width: 300px"/>
                  <div class="absolute bg-black/70 rounded-border" style="left: 4px; top: 4px">
                    <Tag :value="user.role"></Tag>
                  </div>
                </div>
              </div>
              <div class="pt-6">
                <span class="text-lg font-semibold">{{ user.firstName }} {{ user.lastName }}</span>
                <ul>
                  <li>Age: {{ user.age }}</li>
                  <li>Phone Number: {{ user.phone }}</li>
                  <li>Email: {{ user.email }}</li>
                </ul>
                <div class="flex items-center justify-center gap-4 mt-6">
                  <VButton label="Edit" icon="pi pi-pencil" severity="info" size="small" @click="handleShowUser(user.id, 'edit')" />
                  <VButton label="View" icon="pi pi-eye" severity="info" size="small" @click="handleShowUser(user.id, 'view')" />
                  <VButton label="Delete" icon="pi pi-trash" severity="danger" size="small" @click="showDialog = true" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <Paginator
      v-model:first="pagination.first"
      v-model:rows="pagination.rows"
      :totalRecords="pagination.total"
      :rowsPerPageOptions="[10, 20, 30]"
      @page="getUserList"
    />
  </div>
</MainLayout>
<LoadingOverlay v-model="showLoading" />
<UserInfoModal :userId="currentId" :mode="currentMode" v-model="showUserInfo" />
</template>

<script setup>
import DataView from "primevue/dataview"
import Tag from "primevue/tag"
import Paginator from 'primevue/paginator';
import MainLayout from "@/layout/MainLayout.vue";
import {onMounted, reactive, ref} from "vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import UserInfoModal from "@/components/UserInfoModal.vue";

const itemsData = ref([])
const showLoading = ref(false)
const showUserInfo = ref(false)
const currentId = ref(null)
const currentMode = ref(null)

const pagination = reactive({
  first: 0,
  rows: 10,
  total: 0
})

onMounted(() => {
  getUserList()
})

const getUserList = async () => {
  showLoading.value = true
  const response = await fetch(`https://dummyjson.com/users?limit=${pagination.rows}&skip=${pagination.first}`)
  if (response.status !== 200) {
    showLoading.value = false
    return
  }
  const data = await response.json()
  pagination.total = data.total
  itemsData.value = data.users
  console.log(data.users)
  showLoading.value = false
}

const handleShowUser = (userId, mode) => {
  currentId.value = userId
  currentMode.value = mode
  showUserInfo.value = true
}
</script>

<style lang="scss" scoped>
:deep(.p-dataview-content) {
  @apply h-full;
  .p-dataview-empty-message {
    @apply h-full;
  }
}
ol, ul, menu {
  list-style: disc;
}
</style>