<template>
  <router-link
    :to="{ name: 'post', params: { id: post.id } }"
    data-test="post"
    class="panel-block"
  >
    <div>
      <a>{{ post.title  }}</a>
      <div>{{ post.created.format('Do MMM') }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Post } from "../service/types";

export default defineComponent({
  name: 'TimelinePost',

  props: {
    post: { type: Object as () => Post, required: true }
  }
})
</script>
