<script lang="ts" setup>
import 'swiper/css'
import PlusIcon from '@icons/plus.svg'
import StoryItem from '@/components/Molecules/Stories/StoryItem.vue'

import { computed } from 'vue'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const props = withDefaults(
  defineProps<{
    imageSize?: string
    options?: any
    hasAddStory?: boolean
  }>(),
  {
    hasAddStory: false,
    options: {
      modules: [Navigation],
      slidesPerView: 7,
      slidesPerGroup: 4,
      spaceBetween: 12,
      allowTouchMove: true,
      navigation: {
        nextEl: '.navigation-next',
        prevEl: '.navigation-prev',
        disabledClass: 'disabled'
      }
    }
  }
)

const addSizeComp = computed(() => {
  let widthCom = props.imageSize
  if (!!props.imageSize && !isNaN(Number(props.imageSize))) widthCom = widthCom + 'px'
  return widthCom
})

const addStory = () => {
  console.log('object')
}
</script>

<template>

</template>
