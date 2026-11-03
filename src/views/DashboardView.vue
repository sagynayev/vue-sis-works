<script setup>
import { computed, onMounted, ref } from 'vue'
import { ArrowUpRight, BookOpenText, Eye, Heart, MessageCircle, Plus, Quote, Users } from 'lucide-vue-next'
import { fetchPosts, fetchRandomQuote, fetchUsers } from '../services/api'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'

const loading = ref(true)
const error = ref('')
const posts = ref([])
const users = ref([])
const quote = ref(null)

const totalReactions = computed(() =>
  posts.value.reduce((sum, post) => sum + (post.reactions?.likes || 0), 0),
)

const stats = computed(() => [
  { label: 'Published stories', value: posts.value.length, change: '+3 this week', icon: BookOpenText, tone: 'lime' },
  { label: 'Contributors', value: users.value.length, change: '+2 this month', icon: Users, tone: 'coral' },
  { label: 'Story reactions', value: totalReactions.value.toLocaleString(), change: '+18.2%', icon: Heart, tone: 'violet' },
  { label: 'Avg. read time', value: '4m 12s', change: '−8 sec', icon: Eye, tone: 'sky' },
])

async function loadDashboard() {
  loading.value = true
  error.value = ''
  try {
    const [postData, userData, quoteData] = await Promise.all([
      fetchPosts(6),
      fetchUsers(5),
      fetchRandomQuote(),
    ])
    posts.value = postData
    users.value = userData
    quote.value = quoteData
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<template>
  <LoadingState v-if="loading" label="Preparing your editorial desk…" />
  <ErrorState v-else-if="error" message="The public content service did not respond. Check your connection and try again." @retry="loadDashboard" />
  <div v-else class="dashboard-stack">
    <section class="welcome-band">
      <div>
        <p class="eyebrow">Tuesday, 3 November</p>
        <h2>Here’s what’s moving<br />across your publication.</h2>
      </div>
      <RouterLink to="/stories" class="button button--ink"><Plus :size="18" /> New story</RouterLink>
      <div class="welcome-orb welcome-orb--one" />
      <div class="welcome-orb welcome-orb--two" />
    </section>

    <section class="stats-grid" aria-label="Publication statistics">
      <article v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="stat-card__top">
          <span class="stat-icon" :class="`stat-icon--${stat.tone}`"><component :is="stat.icon" :size="19" /></span>
          <span class="trend">{{ stat.change }}</span>
        </div>
        <strong>{{ stat.value }}</strong>
        <p>{{ stat.label }}</p>
      </article>
    </section>

    <section class="dashboard-grid">
      <div class="panel panel--stories">
        <div class="panel-heading">
          <div><p class="eyebrow">Fresh from the desk</p><h2>Recent stories</h2></div>
          <RouterLink to="/stories" class="text-link">View all <ArrowUpRight :size="16" /></RouterLink>
        </div>
        <div class="recent-list">
          <RouterLink v-for="(post, index) in posts.slice(0, 4)" :key="post.id" :to="`/stories/${post.id}`" class="recent-story">
            <span class="story-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="recent-story__copy">
              <div class="tag-row"><span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="mini-tag">{{ tag }}</span></div>
              <h3>{{ post.title }}</h3>
              <div class="story-meta"><span><Heart :size="14" /> {{ post.reactions.likes }}</span><span><MessageCircle :size="14" /> {{ post.reactions.dislikes + 4 }}</span></div>
            </div>
            <ArrowUpRight class="recent-story__arrow" :size="19" />
          </RouterLink>
        </div>
      </div>

      <aside class="dashboard-aside">
        <div class="panel quote-card">
          <span class="quote-mark"><Quote :size="23" /></span>
          <p>“{{ quote?.quote }}”</p>
          <span>— {{ quote?.author }}</span>
        </div>

        <div class="panel contributors-card">
          <div class="panel-heading panel-heading--compact"><div><p class="eyebrow">Community</p><h2>Active contributors</h2></div></div>
          <div class="contributor-stack">
            <RouterLink v-for="person in users.slice(0, 4)" :key="person.id" to="/people" class="contributor-row">
              <img :src="person.image" :alt="`${person.firstName} ${person.lastName}`" />
              <div><strong>{{ person.firstName }} {{ person.lastName }}</strong><span>{{ person.company?.title || 'Contributor' }}</span></div>
              <span class="status-dot" title="Online" />
            </RouterLink>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>
