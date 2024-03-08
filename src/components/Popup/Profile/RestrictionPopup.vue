<script lang="ts" setup>
import ShieldIcon from '@icons/shield.svg'
import CommentIcon from '@icons/comment.svg'
import SendIcon from '@icons/send.svg'
import Modal from '@/components/Modal/Modal.vue'

import type { IUser } from '@/types'

defineProps<{
  user: IUser
  onClose: Fn<any, any>
}>()
</script>

<template>
  <Modal isPopup isShow @click-outside="onClose">
    <div class="w-screen max-w-[400px] bg-modal rounded-xl text-center overflow-hidden">
      <div class="flex flex-col p-6">
        <span class="text-xl mt-1 mb-5">tienes problemas con {{ user.username }} ?</span>
        <div class="flex items-start mb-4">
          <ShieldIcon class="flex-shrink-0 mt-1" />
          <div class="flex-grow ml-4 leading-tight text-left text-textColor-secondary">
            Limita las interacciones no deseadas sin tener que bloquear o dejar de seguir a tu amigo
             saber.
          </div>
        </div>
        <div class="flex items-start mb-4">
          <CommentIcon class="flex-shrink-0 mt-1" />
          <div class="flex-grow ml-4 leading-tight text-left text-textColor-secondary">
            Controlarás si otras personas ven los comentarios que acaban de publicar sobre tus publicaciones.
             No son.
          </div>
        </div>
        <div class="flex items-start">
          <SendIcon class="flex-shrink-0 mt-1" />
          <div class="flex-grow ml-4 leading-tight text-left text-textColor-secondary">
            Controlarás si otras personas ven los comentarios que acaban de publicar sobre tus publicaciones.
             No son.
          </div>
        </div>
      </div>
      <div class="w-full p-4 border-t border-separator-modal select-none">
        <span
          class="font-semibold text-buttonColor-primary hover:text-link cursor-pointer"
          @click="onClose"
          >Restricciones de cuenta</span
        >
      </div>
      <div class="w-full p-4 border-t border-separator-modal select-none">
        <span class="font-semibold hover:opacity-50 cursor-pointer" @click="onClose">Cancelar</span>
      </div>
    </div>
  </Modal>
</template>
