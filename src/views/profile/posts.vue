<script lang="ts" setup>
import Loading from '@/components/Utils/Loading.vue'
import UiButton from '@/components/Form/UiButton.vue'
import PostReviewItem from '@/components/Pages/Post/PostReviewItem.vue'

import { ref, onBeforeMount } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePostStore, useUserStore } from '@/store'
import { usePost } from '@/composables'

const { user, currentUser } = storeToRefs(useUserStore())
const { userPosts } = storeToRefs(usePostStore())
const isLoading = ref(true)

const getPosts = async () => {
  const { getUserPosts } = usePost()
  isLoading.value = true
  userPosts.value = await getUserPosts(user.value!.id)
  isLoading.value = false
}

onBeforeRouteUpdate(async () => {
  await getPosts()
})

onBeforeMount(async () => {
  await getPosts()
})
</script>

<template>
  <div>
    <Loading v-if="isLoading" class="mt-10" />
    <template v-else>
      <div v-if="userPosts" class="flex flex-wrap -mx-[2px]">
        <PostReviewItem
          class="w-1/3 px-[2px] mb-1"
          v-for="post in userPosts"
          :key="post.id"
          :post="post"
        />
      </div>
      <div v-else class="flex flex-center">
        <div class="w-full max-w-[350px] mx-11 my-[60px] flex flex-col flex-center text-center">
          <img src="@/assets/images/CameraCircle.png" />
          <template v-if="currentUser && currentUser?.id == user!.id">
            <span class="my-6 text-3xl font-extrabold">Compartir foto</span>
            <span class="mb-6"
              >Cuando compartes una foto, aparece en tu perfil.</span
            >
            <UiButton variant="text">Comparte tu primera foto</UiButton>
          </template>
          <span v-else class="my-6 text-3xl font-extrabold">Aún no hay publicaciones</span>
        </div>
      </div>
    </template>
  </div>
</template>
