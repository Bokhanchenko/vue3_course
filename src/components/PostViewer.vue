<template>
  <router-link
    :to="{ name: 'post.edit', params: post.id }"
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
    const id = route.params.id as string

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    return {
      post: store.getState().posts.all[id],
    }
  }
})
</script>
