<template>
  <PostWriter :post="post" @save="save" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from './service/store'
import { Post } from './service/types'
import moment from 'moment'

import PostWriter from './components/PostWriter.vue'

export default defineComponent({
  name: 'NewPostPage',

  components: {
    PostWriter
  },

  setup() {
    const store = useStore()
    const router = useRouter()

    const post: Post = {
      id: -1,
      title: 'New Post',
      markdown: '## New Post\nEnter your post here...',
      html: '',
      created: moment(),
      authorId: parseInt(store.getState().authors.currentUserId!, 10)
    }

    return {
      post,
      save: async (post: Post) => {
        await store.createPost(post)
        return router.push('/')
      }
    }
  }
})
</script>
