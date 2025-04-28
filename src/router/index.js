import Vue from 'vue';
import VueRouter from 'vue-router';
import BarPage from '../views/BarPage.vue';
import Bar from '../views/Bar.vue';
import Favorite from '../views/Favorite.vue';
import AuthModule from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'BarPage', component: BarPage },
  { path: '/bar/:barId', name: 'Bar', component: Bar },
  { path: '/favorite/:userId', name:'Favorite', component : Favorite},
  { path: '/login', name: 'Login', component: () => import('../views/Login.vue') },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;