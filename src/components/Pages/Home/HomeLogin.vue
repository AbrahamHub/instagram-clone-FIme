<script lang="ts" setup>
import Login from '@/components/Pages/Auth/Login.vue'

import { ref, onMounted, onBeforeUnmount } from 'vue'

const index = ref(1)

let interval: NodeJS.Timer

onMounted(() => {
  interval = setInterval(() => {
    if (index.value >= 4) index.value = 1
    else index.value++
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="w-full my-8 max-[450px]:my-0">
    <div class="flex flex-center">
      <div class="home-phone min-[876px]:flex hidden mr-8 mb-3">
      </div>
      <Login />
    </div>
  </div>
</template>

<style scoped>
</style>
