<template>
  <Dialog v-model:visible="showDialog" modal header="Xác nhận" :style="{ width: '25rem' }">
    <div class="flex items-center justify-center text-xl font-semibold">
      Bạn có muốn xóa không?
    </div>
    <div class="flex justify-center gap-2 mt-5">
      <VButton type="button" label="Đóng" severity="secondary" @click="showDialog = false"></VButton>
      <VButton type="button" label="Có" @click="onOk"></VButton>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from "primevue/dialog";

// eslint-disable-next-line
const emits = defineEmits(["ok"]);

// eslint-disable-next-line
const showDialog = defineModel()

const onOk = () => {
  emits("ok");
  showDialog.value = false;
}
</script>

<style lang="scss" scoped>

</style>