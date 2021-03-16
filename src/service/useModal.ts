
import {ref, readonly, markRaw} from 'vue'

const visible = ref(false)
const component = ref()

export function useModal() {
  return {
    component,
    visible: readonly(visible),
    showModal (component) {
      if (component) {
        this.component.value = markRaw(component)
      }

      visible.value = true
    },
    hideModal () {
      this.component.value = null
      visible.value = false
    },
  }
}
