import { computed, reactive } from 'vue'

const STORAGE_KEY = 'pulseboard_session'
const savedUser = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')

export const authState = reactive({
  user: savedUser,
})

export const isAuthenticated = computed(() => Boolean(authState.user))

export function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase()

  if (normalizedEmail !== 'editor@pulseboard.dev' || password !== 'pulse2026') {
    throw new Error('The email or password is incorrect.')
  }

  const user = {
    name: 'Alex Morgan',
    email: normalizedEmail,
    initials: 'AM',
  }

  authState.user = user
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return user
}

export function logout() {
  authState.user = null
  localStorage.removeItem(STORAGE_KEY)
}
