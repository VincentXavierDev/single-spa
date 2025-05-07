<template>
  <Dialog v-model:visible="showDialog" header="User" :style="{ width: '1200px' }" :modal="true" :closable="false">
    <VToast />
    <Form ref="formRef" v-slot="$form" :resolver="resolver" :validateOnValueUpdate="false" :validateOnBlur="true" @submit="onFormSubmit" class="flex flex-col gap-4 w-full">
      <div class="flex flex-col gap-1">
        <label for="firstName" class="text-sm font-medium text-gray-700">FirstName</label>
        <VInputText :disabled="isDisabled" name="firstName" type="text" placeholder="FirstName" fluid />
        <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{ $form.firstName.error.message }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <label for="lastName" class="text-sm font-medium text-gray-700">LastName</label>
        <VInputText :disabled="isDisabled" name="lastName" type="text" placeholder="LastName" fluid />
        <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">{{ $form.lastName.error.message }}</Message>
      </div>
      <div class="flex flex-col gap-2">
        <label for="gender" class="text-sm font-medium text-gray-700">Gender</label>
        <RadioButtonGroup :disabled="isDisabled" name="gender" class="flex flex-wrap gap-4">
          <div class="flex items-center gap-2">
            <RadioButton :disabled="isDisabled" inputId="male" value="male" />
            <label for="male">Male</label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton :disabled="isDisabled" inputId="female" value="female" />
            <label for="female">Female</label>
          </div>
        </RadioButtonGroup>
        <Message v-if="$form.gender?.invalid" severity="error" size="small" variant="simple">{{ $form.gender.error?.message }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <label for="email" class="text-sm font-medium text-gray-700">Email</label>
        <VInputText :disabled="isDisabled" name="email" type="text" placeholder="Email" fluid />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error.message }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <label for="role" class="text-sm font-medium text-gray-700">Role</label>
        <Select :disabled="isDisabled" name="role" :options="roleList" placeholder="Select a role" fluid />
        <Message v-if="$form.role?.invalid" severity="error" size="small" variant="simple">{{ $form.role.error?.message }}</Message>
      </div>
      <div class="flex gap-4 items-center justify-end">
        <VButton label="Cancel" icon="pi pi-times" class="p-button-text" @click="handleClose" />
        <VButton v-if="!isDisabled" type="submit" label="Save" icon="pi pi-check" class="p-button-text" />
      </div>
    </Form>
  </Dialog>
  <LoadingOverlay v-model="showLoading" />
</template>

<script setup>
import {Form} from '@primevue/forms';
import Dialog from "primevue/dialog";
import Message from "primevue/message";
import RadioButton from "primevue/radiobutton";
import Select from "primevue/select";
import RadioButtonGroup from "primevue/radiobuttongroup";
import {computed, reactive, ref, watch} from "vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import {useToast} from "primevue/usetoast";

const toast = useToast();
// eslint-disable-next-line
const emits = defineEmits(["refresh"]);
// eslint-disable-next-line
const showDialog = defineModel()
// eslint-disable-next-line
const props = defineProps({
  userId: {
    type: Number,
    default: null,
  },
  mode: {
    type: String,
    default: 'view',
  }
})
const isDisabled = computed(() => props.mode === 'view');
const isCreate = computed(() => props.mode === 'create');
const showLoading = ref(false)
const formRef = ref()

const initialValues = reactive({
  firstName: '',
  lastName: '',
  gender: 'male',
  email: '',
  role: 'admin',
});

watch(showDialog , (value) => {
  if(!value) {
    formRef.value?.reset()
    return
  }
  if (!isCreate.value) getUserDetail()
})

const getUserDetail = async () => {
  if (!props.userId) return
  const res = await fetch(`https://dummyjson.com/users/${props.userId}`)
  const data = await res.json()
  Object.assign(initialValues, {
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    email: data.email,
    role: data.role,
  })
  formRef.value.setValues(initialValues)
}

const roleList = ref(['admin', 'moderator'])

const resolver = ({ values }) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = [{ message: 'FirstName is required.' }];
  }

  if (!values.lastName) {
    errors.lastName = [{ message: 'LastName is required.' }];
  }

  return {
    errors
  };
};

const handleClose = () => {
  showDialog.value = false
}

const onFormSubmit = async ({ valid, states }) => {
  if (!valid) return
  showLoading.value = true
  const dataBody = JSON.stringify({
    email: states?.email.value,
    firstName: states?.firstName.value,
    gender: states?.gender.value,
    lastName: states?.lastName.value,
    role: states?.role.value,
  })
  let response = null
  if (isCreate.value) {
    response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dataBody
    })
  } else {
    response = await fetch(`https://dummyjson.com/users/${props.userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: dataBody
    })
  }
  showLoading.value = false
  if (response.status !== 200) {
    toast.add({ severity:'error', summary: 'Lỗi', detail: 'Không thành công!', life: 2000 })
    return
  }
  toast.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công!', life: 2000 })
  handleClose()
  emits('refresh')
};
</script>

<style lang="scss" scoped>

</style>