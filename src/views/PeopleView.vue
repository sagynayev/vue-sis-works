<script setup>
import { computed, onMounted, ref } from 'vue'
import { Building2, Mail, MapPin, Search, Users } from 'lucide-vue-next'
import { fetchUsers } from '../services/api'
import LoadingState from '../components/LoadingState.vue'
import ErrorState from '../components/ErrorState.vue'

const people = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')

const filteredPeople = computed(() => {
  const term = search.value.toLowerCase().trim()
  if (!term) return people.value
  return people.value.filter((person) =>
    `${person.firstName} ${person.lastName} ${person.company?.title}`.toLowerCase().includes(term),
  )
})

async function loadPeople() {
  loading.value = true
  error.value = ''
  try {
    people.value = await fetchUsers(12)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadPeople)
</script>

<template>
  <div class="people-page">
    <section class="people-hero">
      <div>
        <p class="eyebrow">People behind the pages</p>
        <h2>A publication is a<br />collective point of view.</h2>
        <p>Meet the writers, researchers, and editors who bring every issue to life.</p>
      </div>
      <div class="people-hero__badge"><Users :size="27" /><strong>{{ people.length || '—' }}</strong><span>contributors</span></div>
    </section>

    <label class="search-box search-box--wide">
      <Search :size="18" />
      <input v-model="search" type="search" placeholder="Search contributors by name or role…" />
    </label>

    <LoadingState v-if="loading" label="Gathering the contributor directory…" />
    <ErrorState v-else-if="error" @retry="loadPeople" />
    <div v-else-if="filteredPeople.length" class="people-grid">
      <article v-for="(person, index) in filteredPeople" :key="person.id" class="person-card">
        <div class="person-card__image" :class="`person-card__image--${index % 4}`">
          <img :src="person.image" :alt="`${person.firstName} ${person.lastName}`" loading="lazy" />
          <span class="person-index">{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
        <div class="person-card__copy">
          <p>{{ person.company?.department || 'Editorial' }}</p>
          <h3>{{ person.firstName }} {{ person.lastName }}</h3>
          <span class="person-role">{{ person.company?.title }}</span>
          <div class="person-details">
            <span><Building2 :size="15" /> {{ person.company?.name }}</span>
            <span><MapPin :size="15" /> {{ person.address?.city }}, {{ person.address?.stateCode }}</span>
            <a :href="`mailto:${person.email}`"><Mail :size="15" /> {{ person.email }}</a>
          </div>
        </div>
      </article>
    </div>
    <div v-else class="empty-state"><Search :size="28" /><h3>No contributors found</h3><p>Try searching with a different name or role.</p></div>
  </div>
</template>
