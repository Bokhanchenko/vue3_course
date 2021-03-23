<template>
  <div class="message is-primary is-marginless">
    <div class="message-header">
      <p>Posts</p>
    </div>
  </div>

  <nav class="is-primary panel">
    <p class="panel-tabs">
      <a v-for="period in periods" :key="period" data-test="period"
         :class="[ period === selectedPeriod ? 'is-active' : '']"
         @click="setPeriod(period)"
      >
        {{ period }}
      </a>
    </p>

    <TimelinePost v-for="post in posts" :key="post.id" :post="post" />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import moment from 'moment'
import { Period, Post } from '../service/types'
import { useStore } from '../service/store'

import TimelinePost from './TimelinePost.vue'

export default defineComponent({
  name: 'Timeline',

  components: {
    TimelinePost
  },

  async setup() {
    const periods: Period[] = ['today', 'this week', 'this month']
    const selectedPeriod = ref<Period>('today')

    const store = useStore()

    if (!store.getState().posts.loaded) {
      await store.fetchPosts()
    }

    const allPosts = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const post = store.getState().posts.all[id]
      return acc.concat(post)
    }, [])

    const posts = computed(() => allPosts.filter(post => {
        if (
          selectedPeriod.value === 'today' &&
          post.created.isAfter(moment().subtract(1, 'day'))
        ) {
          return true
        } else if (
          selectedPeriod.value === 'this week' &&
          post.created.isAfter(moment().subtract(7, 'day'))
        ) {
          return true
        } else if (
          selectedPeriod.value === 'this month' &&
          post.created.isAfter(moment().subtract(1, 'month'))
        ) {
          return true
        }

        return false
      })
    )

    return {
      periods,
      selectedPeriod,
      posts,

      setPeriod: (period: Period) => {
        selectedPeriod.value = period
      },
    }
  }
})
</script>
