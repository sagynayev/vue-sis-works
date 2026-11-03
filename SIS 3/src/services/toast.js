import { reactive } from 'vue'

export const toasts = reactive([])

export function showToast(message, type = 'success') {
  const id = Date.now() + Math.random()
  toasts.push({ id, message, type })
  window.setTimeout(() => dismissToast(id), 3600)
}

export function dismissToast(id) {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index !== -1) toasts.splice(index, 1)
}
