<script setup>
import { ArrowUpRight, Braces, Cloud, Database, Layers3, Route, ShieldCheck } from 'lucide-vue-next'

const capabilities = [
  { icon: Cloud, title: 'Live public API', text: 'Axios connects the interface to DummyJSON for posts, authors, and quotes.' },
  { icon: Braces, title: 'Complete CRUD', text: 'Create, read, update, and delete requests are reflected instantly in the content library.' },
  { icon: Route, title: 'Thoughtful routing', text: 'Lazy-loaded pages, guarded navigation, dynamic story URLs, and a custom 404 experience.' },
  { icon: ShieldCheck, title: 'Protected workspace', text: 'A local demo session guards the editorial pages and supports secure sign-out.' },
]
</script>

<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="about-hero__number">01</div>
      <div>
        <p class="eyebrow">The idea</p>
        <h2>Calm tools for<br /><em>busy editorial minds.</em></h2>
        <p>Pulseboard is a Vue-based content workspace built to turn an ordinary mock API assignment into a focused, useful product experience.</p>
      </div>
    </section>

    <section class="about-statement">
      <p>Designed around a simple principle:</p>
      <h3>Software should make the work feel clearer—not louder.</h3>
    </section>

    <section class="capability-section">
      <div class="section-side-title"><span>02</span><p>What’s inside</p></div>
      <div class="capability-grid">
        <article v-for="item in capabilities" :key="item.title">
          <span><component :is="item.icon" :size="23" /></span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="stack-panel">
      <div><p class="eyebrow">Built from scratch</p><h2>A small, modern stack.</h2></div>
      <div class="stack-list">
        <span><Layers3 :size="18" /> Vue 3 Composition API</span>
        <span><Route :size="18" /> Vue Router 4</span>
        <span><Cloud :size="18" /> Axios</span>
        <span><Database :size="18" /> DummyJSON</span>
      </div>
      <a href="https://github.com" target="_blank" rel="noreferrer" class="button button--light">View repository <ArrowUpRight :size="17" /></a>
    </section>
  </div>
</template>
