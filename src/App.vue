<script setup>
import { ref } from 'vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
import { normalizePageHash, generateTimeLineItems } from './functions';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import TheTimeLine from './pages/TheTimeLine.vue';

// определение конкретной страницы для подсветки пункта меню
const currentPage = ref(normalizePageHash());

// данные временной шкалы
const timelineItems = generateTimeLineItems();

function goTo(page) {
  currentPage.value = page
};
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TheTimeLine v-show="currentPage === PAGE_TIMELINE" :timeline-items="timelineItems" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
