import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '@/views/Tabs.vue';
import TabFight from '@/views/TabFight.vue';
import TabPlanify from '@/views/TabPlanify.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/fight'
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
