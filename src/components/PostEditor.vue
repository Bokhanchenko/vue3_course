<template>
  <PostWriter :post="post" @save="save" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "../service/store"
import { Post } from '../service/types'

import PostWriter from './PostWriter.vue'

export default defineComponent({
  name: 'PostEditor',

  components: {
    PostWriter
  },

  async setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = route.params.id as string

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const post = store.getState().posts.all[id]
    const canEdit = post.authorId === parseInt(store.getState().authors.currentUserId!, 10)

    if (!canEdit) {
      await router.push({ name: 'home' })
    }

    return {
      post,
      async save (_post) {
        await store.updatePost(_post)
        return router.push({ name: 'home' })
      }
    }
  }
})
</script>
