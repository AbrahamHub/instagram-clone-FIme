<script lang="ts" setup>
import UiButton from '@/components/Form/UiButton.vue'
import UiInput from '@/components/Form/UiInput.vue'
import LogoText from '@icons/logo-text.svg'

import { ref, computed } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store'
import { useAuth } from '@/composables'

const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')
const authError = ref<Nullable<string>>(null)
const loading = ref(false)

const isDisable = computed(() => {
  return !(username.value != '' && password.value.length >= 8)
})

const submitLoginForm = async () => {
  const { setCurrentUser } = useUserStore()
  const { getUserInLogin } = useAuth()

  loading.value = true

  const user = await getUserInLogin(username.value, password.value)

  if (user) {
    setCurrentUser(user)
    authError.value = null
    if (route.path != '/') router.push('/')
    else router.go(0)
  } else {
    authError.value = 'Lo sentimos, tu contraseña es incorrecta. Por favor verifique su contraseña nuevamente.'
  }

  loading.value = false
}
</script>

<template>
  <div class="bg">
  <div
    class=" w-[450px] h-[550px] flex flex-col mt-3 max-[850px]:mt-0 max-[450px]:w-full no-dark text-textColor-primary "
  >
    <div
      class="flex flex-col h-[550px] items-center py-5 px-10 border rounded-lg border-borderColor max-[450px]:px-4 max-[450px]:border-none"
    >
      <RouterLink to="/" class="mt-[26px] mb-10">
        <LogoText />
      </RouterLink>
      <form id="loginForm" class="w-full text-center" @submit.prevent="submitLoginForm">
        <UiInput
          class="mb-[26px]"
          name="username"
          placeholder="Nombre de usuario o correo electrónico"
          v-model:propValue="username"
        />
        <UiInput
          class="mb-[26px]"
          name="password"
          placeholder="Contraseña"
          type="password"
          v-model:propValue="password"
        />

        <UiButton
          type="submit"
          primary
          class="mt-6 mb-6 w-full "
          id="loginButton"
          :disabled="isDisable"
          :isLoading="loading">Iniciar sesión</UiButton
        >
        <RouterLink class="w-full " to="/accounts/signup">
        <UiButton
          primary
          id="regisButton"
          class="mt-6 mb-6 w-full">Crear cuenta nueva</UiButton
        ></RouterLink>
      </form>
    </div>
  </div>
</div>
</template>
<style scoped>
#loginButton {
  background: rgba(212, 58, 114, 1);
  border-radius: 999px;
}
#regisButton {
  background: rgba(240, 177, 102, 1);
  border-radius: 999px;
}
</style>