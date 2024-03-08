<script lang="ts" setup>
import Avatar from '@/components/Atom/Avatar.vue'

withDefaults(
  defineProps<{
    n: any
    avatarSize?: string
  }>(),
  {
    avatarSize: '75'
  }
)
</script>

<template>
</template>
