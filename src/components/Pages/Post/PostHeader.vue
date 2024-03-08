<script lang="ts" setup>
import EllipsisIcon from '@icons/ellipsis.svg'
import Avatar from '@/components/Atom/Avatar.vue'
import UiButton from '@/components/Form/UiButton.vue'
import UnfollowPopup from '@/components/Popup/UnfollowPopup.vue'
import ActionsPopup from '@/components/Popup/ActionsPopup.vue'

import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import { useFollow } from '@/composables'
import type { IAction } from '@/types'

const { user, currentUser } = storeToRefs(useUserStore())
const isLoadingFollow = ref(false)
const unfollowPopupActive = ref(false)
const actionsPopupActive = ref(false)

const userPostActions = computed(() => {
  if (currentUser.value?.id == user.value!.id)
    return [
      {
        title: 'Borrar',
        classes: 'font-bold text-error',
        action: () => {}
      },
      {
        title: 'Editar'
      },
      {
        title: 'Mostrar me gusta'
      },
      {
        title: 'Desactivar comentarios'
      },
      {
        title: 'Compartir a...'
      },
      {
        title: 'Copiar link'
      },
      {
        title: 'Agregar'
      },
      {
        title: 'Cancelar',
        action: () => {
          actionsPopupActive.value = false
        }
      }
    ] as IAction[]
  else
    return [
      {
        title: 'Informe',
        classes: 'font-bold text-error'
      },
      {
        title: 'Dejar de seguir',
        classes: 'font-bold text-error',
        action: () => {
          unfollowPopupActive.value = true
        }
      },
      {
        title: 'Agregar a los favoritos'
      },
      {
        title: 'Cancelar',
        action: () => {
          actionsPopupActive.value = false
        }
      }
    ] as IAction[]
})

const follow = async () => {
  if (currentUser) {
    const { setFollow } = useFollow()

    isLoadingFollow.value = true
    await setFollow(currentUser.value!.id, user.value!.id)
    isLoadingFollow.value = false
    user.value!.isCurrentUserFollowing = true
  }
}

const unfollow = async () => {
  if (currentUser) {
    const { deleteFollow } = useFollow()

    unfollowPopupActive.value = false
    isLoadingFollow.value = true
    await deleteFollow(currentUser.value!.id, user.value!.id)
    isLoadingFollow.value = false
    user.value!.isCurrentUserFollowing = false
  }
}
</script>

<template>
  <div class="flex items-center justify-between border-b border-borderColor">
    <div class="flex items-center p-[10px]">
      <RouterLink :to="{name: 'Profile', params: {username: user!.username}}">
        <Avatar width="32" :avatar-url="user!.avatar" />
      </RouterLink>
      <div class="ml-3 font-semibold leading-none">
        <RouterLink :to="{name: 'Profile', params: {username: user!.username}}">
          <span class="hover:opacity-60">{{ user!.username }}</span>
        </RouterLink>
        <template v-if="user!.id != currentUser?.id && user!.isCurrentUserFollowing">
          <span class="mx-1">•</span>
          <UiButton
            secondary
            variant="text"
            class="!p-0"
            @click="
              () => {
                unfollowPopupActive = true
              }
            "
            :is-disabled="isLoadingFollow"
            :is-loading="isLoadingFollow"
            ></UiButton
          >
        </template>
        <template v-if="user!.id != currentUser?.id && !user!.isCurrentUserFollowing">
          <span class="mx-1">•</span>
          <UiButton
            primary
            variant="text"
            class="!p-0"
            @click="follow"
            :is-disabled="isLoadingFollow"
            :is-loading="isLoadingFollow"
            >Seguir</UiButton
          >
        </template>
      </div>
    </div>
    <div class="p-2 cursor-pointer">
      <EllipsisIcon
        @click="
          () => {
            actionsPopupActive = true
          }
        "
      />
    </div>
  </div>
  <UnfollowPopup
    v-if="unfollowPopupActive"
    :user="user!"
    :onConfirm="unfollow"
    :onCancel="
      () => {
        unfollowPopupActive = false
      }
    "
    :onClickOutside="
      () => {
        unfollowPopupActive = false
      }
    "
  />
  <ActionsPopup
    v-if="actionsPopupActive"
    :actions="userPostActions"
    :on-click-outside="
      () => {
        actionsPopupActive = false
      }
    "
  />
</template>
