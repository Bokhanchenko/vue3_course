<template>
  <div>
    Post Editor

    <router-link :to="{ name: 'post.edit', params: { id: post.id } }">
      Post
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../service/store";

export default defineComponent({
  name: 'PostEditor',

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
      return router.push({ name: 'home' })
    }

    return {
      post,
    }
  }
})
</script>
