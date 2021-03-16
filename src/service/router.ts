import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../HomePage.vue'
import NewPostPage from '../NewPostPage.vue'
import EditPostPage from '../EditPostPage.vue'
import ShowPostPage from '../ShowPostPage.vue'
import { store } from './store'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage
    },
    {
      name: 'post',
      path: '/posts/:id',
      component: ShowPostPage
    },
    {
      name: 'post.new',
      path: '/posts/new',
      component: NewPostPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: 'post.edit',
      path: '/posts/:id/edit',
      component: EditPostPage,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getState().authors.currentUserId) {
    next({
      name: 'home'
    })
  } else {
    next()
  }
})
