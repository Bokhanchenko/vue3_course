<template>
  <form @submit.prevent="submit">
    <FormInput
      type="text"
      name="Username"
      v-model="username"
      :error="usernameStatus.message"
    />
    <FormInput
      type="password"
      name="Password"
      v-model="password"
      :error="passwordStatus.message"
    />
    <button
      class="button is-primary"
      :disabled="!usernameStatus.valid || !passwordStatus.valid"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { required, length, validate, Status } from '../service/validators'
import { defineComponent, computed, ref } from 'vue'
import FormInput from './FormInput.vue'
import { User } from '../service/types'
import { useStore } from '../service/store'
import { useModal } from '../service/useModal'

export default defineComponent({
  name: 'Signup',

  components: {
    FormInput
  },

  setup () {
    const store = useStore()
    const modal = useModal()

    const username = ref('username')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [ required(), length({ min: 5, max: 10 })])
    })

    const password = ref('password')
    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [ required(), length({ min: 10, max: 40 })])
    })

    return {
      usernameStatus,
      username,
      password,
      passwordStatus,
      submit: async (e: any) => {
        if (!usernameStatus.value.valid || !passwordStatus.value.valid) {
          return
        }

        const user: User = {
          id: -1,
          username: username.value,
          password: password.value,
        }

        await store.createUser(user)
        modal.hideModal()
      }
    }
  }
})
</script>

<style scoped>
form {
  background: white;
  padding: 15px;
}

</style>
