<script setup>
import { computed, onMounted, ref } from 'vue'
import { Edit3, Eye, Heart, MoreHorizontal, Plus, Search, Trash2 } from 'lucide-vue-next'
import { createPost, deletePost, fetchPosts, updatePost } from '../services/api'
import { showToast } from '../services/toast'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'
import StoryModal from '../components/StoryModal.vue'

const loading = ref(true)
const error = ref('')
const stories = ref([])
const search = ref('')
const activeTag = ref('all')
const modalOpen = ref(false)
const editingStory = ref(null)
const saving = ref(false)
const deletingId = ref(null)

const tags = computed(() => ['all', ...new Set(stories.value.flatMap((story) => story.tags || []).slice(0, 6))])

const filteredStories = computed(() => {
  const term = search.value.trim().toLowerCase()
  return stories.value.filter((story) => {
    const matchesSearch = !term || story.title.toLowerCase().includes(term) || story.body.toLowerCase().includes(term)
    const matchesTag = activeTag.value === 'all' || story.tags?.includes(activeTag.value)
    return matchesSearch && matchesTag
  })
})

async function loadStories() {
  loading.value = true
  error.value = ''
  try {
    stories.value = await fetchPosts(12)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingStory.value = null
  modalOpen.value = true
}

function openEdit(story) {
  editingStory.value = story
  modalOpen.value = true
}

async function saveStory(payload) {
  saving.value = true
  try {
    if (editingStory.value) {
      const updated = await updatePost(editingStory.value.id, payload)
      const index = stories.value.findIndex((item) => item.id === editingStory.value.id)
      stories.value[index] = { ...stories.value[index], ...updated, ...payload }
      showToast('Story updated successfully.')
    } else {
      const created = await createPost(payload)
      stories.value.unshift({ ...created, ...payload, reactions: { likes: 0, dislikes: 0 }, views: 0 })
      showToast('New story published.')
    }
    modalOpen.value = false
  } catch (err) {
    showToast(err.message || 'Could not save the story.', 'error')
  } finally {
    saving.value = false
  }
}

async function removeStory(story) {
  if (!window.confirm(`Delete “${story.title}”? This cannot be undone.`)) return
  deletingId.value = story.id
  try {
    await deletePost(story.id)
    stories.value = stories.value.filter((item) => item.id !== story.id)
    showToast('Story deleted from the library.')
  } catch (err) {
    showToast(err.message || 'Could not delete the story.', 'error')
  } finally {
    deletingId.value = null
  }
}

onMounted(loadStories)
</script>

<template>
  <div class="stories-page">
    <section class="page-intro">
      <div>
        <p class="eyebrow">{{ stories.length }} pieces in your library</p>
        <h2>Shape the stories<br />worth sharing.</h2>
      </div>
      <button class="button button--primary" @click="openCreate"><Plus :size="18" /> Create story</button>
    </section>

    <div class="content-toolbar">
      <label class="search-box">
        <Search :size="18" />
        <input v-model="search" type="search" placeholder="Search by headline or copy…" />
      </label>
      <div class="filter-pills" aria-label="Filter by tag">
        <button v-for="tag in tags" :key="tag" :class="{ active: activeTag === tag }" @click="activeTag = tag">
          {{ tag === 'all' ? 'All stories' : tag }}
        </button>
      </div>
    </div>

    <LoadingState v-if="loading" label="Loading the story library…" />
    <ErrorState v-else-if="error" @retry="loadStories" />
    <template v-else>
      <div v-if="filteredStories.length" class="story-grid">
        <article v-for="(story, index) in filteredStories" :key="story.id" class="story-card">
          <div class="story-card__accent" :class="`story-card__accent--${index % 4}`">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <MoreHorizontal :size="21" />
          </div>
          <div class="story-card__body">
            <div class="tag-row"><span v-for="tag in story.tags?.slice(0, 2)" :key="tag" class="mini-tag">{{ tag }}</span></div>
            <RouterLink :to="`/stories/${story.id}`"><h3>{{ story.title }}</h3></RouterLink>
            <p>{{ story.body }}</p>
            <div class="story-card__stats">
              <span><Eye :size="15" /> {{ story.views ?? 0 }}</span>
              <span><Heart :size="15" /> {{ story.reactions?.likes ?? 0 }}</span>
            </div>
          </div>
          <footer class="story-card__footer">
            <span class="status-badge"><i /> Published</span>
            <div>
              <button class="icon-button" aria-label="Edit story" @click="openEdit(story)"><Edit3 :size="17" /></button>
              <button class="icon-button icon-button--danger" :disabled="deletingId === story.id" aria-label="Delete story" @click="removeStory(story)">
                <span v-if="deletingId === story.id" class="spinner spinner--small" />
                <Trash2 v-else :size="17" />
              </button>
            </div>
          </footer>
        </article>
      </div>
      <div v-else class="empty-state">
        <Search :size="28" />
        <h3>No stories found</h3>
        <p>Try a different search term or remove the active filter.</p>
        <button class="button button--secondary" @click="search = ''; activeTag = 'all'">Clear filters</button>
      </div>
    </template>

    <StoryModal :open="modalOpen" :story="editingStory" :saving="saving" @close="modalOpen = false" @save="saveStory" />
  </div>
</template>
