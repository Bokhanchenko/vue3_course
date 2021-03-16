<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="auth">
        <router-link class="button" :to="{ name: 'post.new' }">
          New Post
        </router-link>
        <button class="button" @click="signout">Signout</button>
      </div>

      <div class="buttons" v-if="!auth">
        <button class="button" @click="signup">Signup</button>
        <button class="button" @click="signin">Signin</button>
      </div>
    </div>

    <teleport to="#modal" v-if="modal.visible.value">
      <component :is="modal.component.value" />
    </teleport>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useModal } from '../service/useModal'
import { useStore } from '../service/store'

import Signup from './Signup.vue'

export default defineComponent({
  name: 'NavBar',

  setup() {
    const store = useStore()
    const auth = computed(() => store.getState().authors.currentUserId)
    const modal = useModal()

    return {
      modal,
      auth,
      signup:  () =>  modal.showModal(Signup),
      signin: () => modal.showModal(null),
      signout: () => {}
    }
  }
})
</script>
