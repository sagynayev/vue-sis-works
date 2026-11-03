<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Clock3, Eye, Heart, MessageCircle, Share2 } from 'lucide-vue-next'
import { fetchPost } from '../services/api'
import { showToast } from '../services/toast'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'

const route = useRoute()
const story = ref(null)
const loading = ref(true)
const error = ref('')

async function loadStory() {
  loading.value = true
  error.value = ''
  try {
    story.value = await fetchPost(route.params.id)
  } catch (err) {
    error.value = err.response?.status === 404 ? 'This story no longer exists.' : err.message
  } finally {
    loading.value = false
  }
}

async function share() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showToast('Story link copied to clipboard.')
  } catch {
    showToast('Could not copy the link.', 'error')
  }
}

onMounted(loadStory)
watch(() => route.params.id, loadStory)
</script>

<template>
  <LoadingState v-if="loading" label="Opening the story…" />
  <ErrorState v-else-if="error" title="Story unavailable" :message="error" @retry="loadStory" />
  <article v-else-if="story" class="detail-page">
    <RouterLink to="/stories" class="back-link"><ArrowLeft :size="17" /> Back to stories</RouterLink>

    <header class="article-header">
      <div class="tag-row tag-row--center"><span v-for="tag in story.tags" :key="tag" class="mini-tag">{{ tag }}</span></div>
      <h2>{{ story.title }}</h2>
      <p>{{ story.body }}</p>
      <div class="article-byline">
        <div class="avatar avatar--coral">ED</div>
        <div><strong>Editorial Desk</strong><span>Published 3 Nov 2026</span></div>
        <i />
        <span><Clock3 :size="16" /> 4 min read</span>
      </div>
    </header>

    <div class="article-cover">
      <span class="article-cover__word">PULSE</span>
      <div class="article-cover__shape article-cover__shape--one" />
      <div class="article-cover__shape article-cover__shape--two" />
      <div class="article-cover__shape article-cover__shape--three" />
    </div>

    <div class="article-layout">
      <div class="article-share">
        <button aria-label="Like story"><Heart :size="19" /><span>{{ story.reactions.likes }}</span></button>
        <button aria-label="Comments"><MessageCircle :size="19" /><span>{{ story.reactions.dislikes + 4 }}</span></button>
        <button aria-label="Share story" @click="share"><Share2 :size="19" /></button>
      </div>
      <div class="article-copy">
        <p class="dropcap">{{ story.body }} {{ story.body }}</p>
        <h3>Making room for better questions</h3>
        <p>Good editorial work begins with attention. It asks us to slow down, notice the details, and connect an idea to the people it may serve. The strongest stories do more than deliver information—they create a useful point of view.</p>
        <blockquote>Clarity is not the absence of complexity. It is the result of working thoughtfully through it.</blockquote>
        <p>Our process is deliberately collaborative. Writers, editors, researchers, and readers each leave a trace on the final piece. That shared ownership is what gives the work its energy and helps every story find its most honest form.</p>
      </div>
      <aside class="article-info">
        <p>Story performance</p>
        <strong><Eye :size="18" /> {{ story.views.toLocaleString() }}</strong><span>Total views</span>
        <strong><Heart :size="18" /> {{ story.reactions.likes }}</strong><span>Reader reactions</span>
      </aside>
    </div>
  </article>
</template>
