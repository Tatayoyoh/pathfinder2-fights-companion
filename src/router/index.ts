import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '@/views/Tabs.vue';
import TabFight from '@/views/TabFight.vue';
import TabPlanify from '@/views/TabPlanify.vue';
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
    component: Tabs,

    children: [
      {
        path: '',
        redirect: 'fight'
      },
      {
        path: 'fight',
        component: TabFight
      },
      {
        path: 'planify',
        component: TabPlanify
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
