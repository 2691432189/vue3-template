import { computed } from 'vue'

export const useComputed = (state:any) => {
  return computed( () => {
      return state
  })
}