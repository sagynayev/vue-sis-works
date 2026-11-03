<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight, BookOpen, Eye, EyeOff, LockKeyhole, Sparkles } from 'lucide-vue-next'
import { login } from '../services/auth'

const router = useRouter()
const route = useRoute()
const email = ref('editor@pulseboard.dev')
const password = ref('pulse2026')
const showPassword = ref(false)
const error = ref('')
const submitting = ref(false)

async function submit() {
  error.value = ''
  submitting.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 550))
    login(email.value, password.value)
    router.push(typeof route.query.redirect === 'string' ? route.query.redirect : '/')
  } catch (err) {
    error.value = err.message
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-visual">
      <RouterLink to="/login" class="brand brand--light">
        <span class="brand-mark brand-mark--light"><BookOpen :size="20" /></span>
        <span>Pulseboard</span>
      </RouterLink>

      <div class="login-visual__content">
        <span class="kicker"><Sparkles :size="14" /> The editorial workspace</span>
        <h1>Ideas deserve<br /><em>good momentum.</em></h1>
        <p>Plan stories, meet contributors, and keep your publishing rhythm in one thoughtful workspace.</p>
      </div>

      <blockquote>
        “The first draft is just you telling yourself the story.”
        <cite>— Terry Pratchett</cite>
      </blockquote>
    </section>

    <section class="login-panel">
      <div class="login-card">
        <div class="login-card__intro">
          <span class="login-lock"><LockKeyhole :size="21" /></span>
          <p class="eyebrow">Welcome back</p>
          <h2>Sign in to your desk</h2>
          <p>Use the demo credentials below to explore the workspace.</p>
        </div>

        <form class="login-form" @submit.prevent="submit">
          <label>
            <span>Email address</span>
            <input v-model="email" type="email" autocomplete="email" required />
          </label>
          <label>
            <span>Password</span>
            <div class="password-field">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" required />
              <button type="button" :aria-label="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword">
                <EyeOff v-if="showPassword" :size="18" />
                <Eye v-else :size="18" />
              </button>
            </div>
          </label>

          <p v-if="error" class="login-error" role="alert">{{ error }}</p>

          <button class="button button--primary button--full" type="submit" :disabled="submitting">
            <span v-if="submitting" class="spinner spinner--small" />
            {{ submitting ? 'Signing in…' : 'Enter workspace' }}
            <ArrowRight v-if="!submitting" :size="18" />
          </button>
        </form>

        <div class="demo-credentials">
          <span>Demo access</span>
          <code>editor@pulseboard.dev</code>
          <code>pulse2026</code>
        </div>
      </div>
      <p class="login-footer">Built with Vue 3 · Axios · Vue Router</p>
    </section>
  </main>
</template>
