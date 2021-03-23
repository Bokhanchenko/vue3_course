<template>
  <div class="columns">
    <div class="column"></div>

    <div class="column is-two-thirds">
      <router-link
        data-test="can-edit"
        v-if="canEdit"
        :to="{ name: 'post.edit', params: { id: post.id }}"
        class="button is-rounded is-link is-pules-right"
      >
        <i class="fas fa-edit" />
      </router-link>

      <h1>Post title is: {{ post.title }}</h1>
      <div v-html="post.html" />
    </div>

    <div class="column"></div>
  </div>
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
