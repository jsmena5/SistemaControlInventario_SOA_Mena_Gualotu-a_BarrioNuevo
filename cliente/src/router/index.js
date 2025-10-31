import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InsertItemView from '../views/InsertItemView.vue'
import GetItemView from '../views/GetItemView.vue'
import CheckConnectionView from '../views/CheckConnectionView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/insert-item', component: InsertItemView },
  { path: '/get-item', component: GetItemView },
  { path: '/check-connection', component: CheckConnectionView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})