import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Fight from '@/views/Fight.vue';
import Planify from '@/views/Planify.vue';
import FightList from '@/views/FightList.vue';
import Heroes from '@/views/Heroes.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: FightList
  },
  {
    path: '/heroes',
    component: Heroes
  },
  {
    path: '/fight/:id',
    component: Fight,
  },
  {
    path: '/planify/:id',
    component: Planify,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
