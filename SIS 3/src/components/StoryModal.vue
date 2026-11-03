<script setup>
import { computed, reactive, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  open: Boolean,
  story: { type: Object, default: null },
  saving: Boolean,
})

const emit = defineEmits(['close', 'save'])

const form = reactive({ title: '', body: '', tags: '' })
const errors = reactive({ title: '', body: '' })
const isEditing = computed(() => Boolean(props.story))

watch(
  () => [props.open, props.story],
  () => {
    if (!props.open) return
    form.title = props.story?.title || ''
    form.body = props.story?.body || ''
    form.tags = props.story?.tags?.join(', ') || ''
    errors.title = ''
    errors.body = ''
  },
  { deep: true },
)

function submit() {
  errors.title = form.title.trim() ? '' : 'A headline is required.'
  errors.body = form.body.trim() ? '' : 'Story copy is required.'
  if (errors.title || errors.body) return

  emit('save', {
    title: form.title.trim(),
    body: form.body.trim(),
    tags: form.tags
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean),
    userId: props.story?.userId || 1,
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-backdrop" @mousedown.self="$emit('close')">
        <section class="modal-card" role="dialog" aria-modal="true" :aria-label="isEditing ? 'Edit story' : 'Create story'">
          <header class="modal-card__header">
            <div>
              <p class="eyebrow">{{ isEditing ? 'Update content' : 'New draft' }}</p>
              <h2>{{ isEditing ? 'Edit story' : 'Create a story' }}</h2>
            </div>
            <button class="icon-button" aria-label="Close" @click="$emit('close')"><X :size="20" /></button>
          </header>

          <form class="story-form" @submit.prevent="submit">
            <label>
              <span>Headline</span>
              <input v-model="form.title" type="text" placeholder="Add a clear, compelling headline" />
              <small v-if="errors.title" class="field-error">{{ errors.title }}</small>
            </label>
            <label>
              <span>Story copy</span>
              <textarea v-model="form.body" rows="7" placeholder="Write the main story text…" />
              <small v-if="errors.body" class="field-error">{{ errors.body }}</small>
            </label>
            <label>
              <span>Tags</span>
              <input v-model="form.tags" type="text" placeholder="culture, design, research" />
              <small>Separate tags with commas.</small>
            </label>

            <div class="modal-card__actions">
              <button type="button" class="button button--ghost" :disabled="saving" @click="$emit('close')">Cancel</button>
              <button type="submit" class="button button--primary" :disabled="saving">
                <span v-if="saving" class="spinner spinner--small" />
                {{ saving ? 'Saving…' : isEditing ? 'Save changes' : 'Publish story' }}
              </button>
            </div>
          </form>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
