import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../HomePage.vue'
import NewPostPage from '../NewPostPage.vue'
import EditPostPage from '../EditPostPage.vue'
import ShowPostPage from '../ShowPostPage.vue'
import { store } from './store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/posts/new',
    name: 'post.new',
    component: NewPostPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: ShowPostPage
  },

  {
    path: '/posts/:id/edit',
    name: 'post.edit',
    component: EditPostPage,
    meta: {
      requiresAuth: true
    }
  },
];

export const makeRouter = () => createRouter({
  // it for github page
  history: createWebHistory(process.env.NODE_ENV === 'production' ? 'vue3_course' : ''),
  routes
})

export const router = makeRouter();

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getState().authors.currentUserId) {
    next({
      name: 'home'
    })
  } else {
    next()
  }
})
