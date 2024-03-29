import Home from '@icons/home.svg'
import HomeActive from '@icons/home-active.svg'
import Search from '@icons/glass.svg'
import SearchActive from '@icons/glass-active.svg'
import Explore from '@icons/explore.svg'
import ExploreActive from '@icons/explore-active.svg'
import Reel from '@icons/reel.svg'
import ReelActive from '@icons/reel-active.svg'
import Messenger from '@icons/messenger.svg'
import MessengerActive from '@icons/messenger-active.svg'
import Heart from '@icons/heart.svg'
import HeartActive from '@icons/heart-active.svg'
import Plus from '@icons/plus-square.svg'
import PlusActive from '@icons/plus-square-active.svg'
import Bar from '@icons/bar.svg'
import BarActive from '@icons/bar-active.svg'

import { shallowRef, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore, useResizeStore } from '@/store'
import { type INav, NavTabEnum } from '@/types'

export const useNav = () => {
  const { currentUser } = useUserStore()

  const NAVS: INav[] = [
    { icon: Home, iconActive: HomeActive, title: 'Inicio', name: NavTabEnum.Home, path: '/' },
    {
      icon: Search,
      iconActive: SearchActive,
      title: 'Buscar',
      name: NavTabEnum.Search
    },
    {
      icon: Explore,
      iconActive: ExploreActive,
      title: 'Descubrir',
      name: NavTabEnum.Explore,
      path: '/explore'
    },
    { icon: Reel, iconActive: ReelActive, title: 'Reels', name: NavTabEnum.Reels, path: '/' },
    {
      icon: Messenger,
      iconActive: MessengerActive,
      title: 'Mensajes',
      name: NavTabEnum.Messenger,
      path: '/'
    },
    {
      icon: Heart,
      iconActive: HeartActive,
      title: 'Notificaciones',
      name: NavTabEnum.Notification
    },
    { icon: Plus, iconActive: PlusActive, title: 'Crear', name: NavTabEnum.CreatePost },
    { title: 'Perfil', name: NavTabEnum.Profile, path: `/${currentUser?.username}` }
  ]

  const NAVS_MOBILE: INav[] = [
    {
      icon: Home,
      iconActive: HomeActive,
      title: 'Inicio',
      name: NavTabEnum.Home,
      path: '/'
    },
    {
      icon: Explore,
      iconActive: ExploreActive,
      title: 'Descubrir',
      name: NavTabEnum.Explore,
      path: '/explore'
    },
    { icon: Reel, iconActive: ReelActive, title: 'Reels', name: NavTabEnum.Reels, path: '/' },
    { icon: Plus, iconActive: PlusActive, title: 'Crear', name: NavTabEnum.CreatePost },
    {
      icon: Messenger,
      iconActive: MessengerActive,
      title: 'Mensajes',
      name: NavTabEnum.Messenger,
      path: '/'
    },
    { title: 'Perfil', name: NavTabEnum.Profile, path: `/${currentUser?.username}` }
  ]

  const tabBar: INav = {
    name: NavTabEnum.Bar,
    title: 'Ver más',
    icon: Bar,
    iconActive: BarActive
  }

  const navs = shallowRef<INav[]>([])
  const { screen } = storeToRefs(useResizeStore())

  watch(
    screen,
    (newValue) => {
      if (newValue == 'mobile') navs.value = NAVS_MOBILE
      else navs.value = NAVS
    },
    {
      immediate: true
    }
  )

  return {
    navs,
    tabBar
  }
}
