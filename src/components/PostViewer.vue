<template>
  <router-link
    data-test="can-edit"
    v-if="canEdit"
    :to="{ name: 'post.edit', params: { id: post.id }}"
    class="button is-rounded is-link"
  >
    <i class="fas fa-edit" />
  </router-link>

  <div>Post title is: {{ post.title }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../service/store";

export default defineComponent({
  name: 'PostViewer',

  async setup() {
    const route = useRoute()
    const store = useStore()

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const id = route.params.id as string
    const post = store.getState().posts.all[id]

    return {
      canEdit: post.authorId === Number.parseInt(store.getState().authors.currentUserId!, 10),
      post
    }
  }
})
</script>
