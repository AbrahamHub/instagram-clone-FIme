<script lang="ts" setup>
import UiButton from '@/components/Form/UiButton.vue'
import UiInput from '@/components/Form/UiInput.vue'
import LogoText from '@icons/logo-text.svg'

import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth, useCheck, useUser } from '@/composables'

const router = useRouter()

interface AuthError {
  emailOrPhoneError: string | null
  usernameError: string | null
  signupError: string | null
}

const username = ref('')
const password = ref('')
const fullname = ref('')
const emailOrPhone = ref('')
const authError = ref<AuthError>({
  emailOrPhoneError: null,
  usernameError: null,
  signupError: null
})
const isShowError = ref(false)
const checkContact = ref<Nullable<boolean>>(null)
const checkUsername = ref<Nullable<boolean>>(null)
const checkPassword = ref<Nullable<boolean>>(null)
const loading = ref(false)

const isDisable = computed(() => {
  return !(username.value != '' && emailOrPhone.value != '' && password.value.length >= 8)
})

const submitSignupForm = async () => {
  const { authError: authErr, signUp } = useAuth()

  loading.value = true

  if (authError.value.emailOrPhoneError || authError.value.usernameError) {
    isShowError.value = true
  } else {
    await signUp(emailOrPhone.value, password.value, fullname.value, username.value)

    if (authError.value) {
      authError.value.signupError = authErr.value
      isShowError.value = true
    } else {
      isShowError.value = false
      router.push('/')
    }
  }

  loading.value = false
}

const handleCheckContact = async () => {
  const { getUserWithQuery } = useUser()
  const { checkError, checkPhoneNumber, checkEmail } = useCheck()

  let user = null

  isShowError.value = false

  checkContact.value = null
  const regex = /^\+?\d+$/
  const isPhoneNumber = regex.test(emailOrPhone.value)

  if (isPhoneNumber) {
    const checkValue = await checkPhoneNumber(emailOrPhone.value)
    checkContact.value = checkValue
  } else {
    const checkValue = await checkEmail(emailOrPhone.value)
    checkContact.value = checkValue
  }

  if (checkContact.value) {
    user = await getUserWithQuery('email', '==', emailOrPhone.value)
    if (user) {
      authError.value.emailOrPhoneError = 'Otra cuenta comparte el mismo correo electrónico.'
      checkContact.value = false
    }
  } else {
    authError.value.emailOrPhoneError = checkError.value
  }
}

const handleCheckUsername = async () => {
  const { getUserWithQuery } = useUser()

  isShowError.value = false

  const user = await getUserWithQuery('username', '==', username.value)

  if (user == null) {
    checkUsername.value = true
    authError.value.usernameError = null
  } else {
    checkUsername.value = false
    authError.value.usernameError = 'Este nombre de usuario ya está en uso. Por favor prueba con otro nombre.'
  }
}

const handleCheckPassword = () => {
  isShowError.value = false
  checkPassword.value = password.value.length >= 8 ? true : false
}
</script>

<template>
  <div
    class="w-[350px] flex flex-col mt-3 max-[450px]:mt-0 max-[450px]:w-full no-dark text-textColor-primary"
  >
    <div
      class="flex flex-col items-center py-5 px-10 border rounded-sm border-borderColor max-[450px]:px-4 max-[450px]:border-none"
    >
      <RouterLink to="/" class="mt-[26px] mb-4">
        <LogoText />
      </RouterLink>
      <form id="signupForm" class="w-full text-center mb-[18px]" @submit.prevent="submitSignupForm">
        <div class="flex items-center mb-5">
        </div>
        <UiInput
          class="mb-[6px]"
          name="email"
          placeholder="Número de teléfono o correo electrónico"
          v-model:propValue="emailOrPhone"
          :checkValue="checkContact"
          @change="handleCheckContact"
        />
        <UiInput
          class="mb-[6px]"
          name="fullname"
          placeholder="Nombre completo"
          v-model:propValue="fullname"
          :checkValue="fullname"
          @change="isShowError = false"
        />
        <UiInput
          class="mb-[6px]"
          name="username"
          placeholder="Nombre de usuario"
          v-model:propValue="username"
          :checkValue="checkUsername"
          @change="handleCheckUsername"
        />
        <UiInput
          name="password"
          placeholder="Contraseña"
          type="password"
          v-model:propValue="password"
          :checkValue="checkPassword"
          @change="handleCheckPassword"
        />
        <p class="text-xs text-textColor-secondary my-[15px]">
        </p>
        <UiButton id="regisButton" type="submit" class="w-full" primary :disabled="isDisable" :isLoading="loading"
          >Registrarse</UiButton
        >
        <p v-if="isShowError" class="text-sm text-error mt-8 mb-4">
          {{ authError.emailOrPhoneError || authError.usernameError || authError.signupError }}
        </p>
      </form>
    </div>
    <div
      class="p-[25px] my-[10px] text-center border rounded-sm border-borderColor max-[450px]:border-none"
    >
      <RouterLink  to="/accounts/login" class="font-semibold text-buttonColor-primary"
        >Iniciar sesión</RouterLink
      >
    </div>
  </div>
</template>
<style scoped>
#regisButton {
  background: rgba(240, 177, 102, 1);
  border-radius: 999px;
}
</style>