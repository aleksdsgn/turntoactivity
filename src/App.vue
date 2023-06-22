<script setup>
import { ref } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import TheTimeLine from './pages/TheTimeLine.vue';

// определение конкретной страницы для подсветки пункта меню
const currentPage = ref(normalizePageHash());

// определяем валидное значение хеша на основании названия страниц
// которые получаем из ключей объекта NavItem и уже это валидное значение хеша
// присваиваем реактивной переменной currentPage
function normalizePageHash() {
  const hash = window.location.hash.slice(1)

  if([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(hash)) {
    return hash
  }
  window.location.hash = PAGE_TIMELINE

  return PAGE_TIMELINE
};

function goTo(page) {
  currentPage.value = page
};
</script>

<template>
  <TheHeader
    @go-to-timeline="goTo(PAGE_TIMELINE)"
    @go-to-progress="goTo(PAGE_PROGRESS)"
  />

  <main class="flex flex-grow flex-col">
    <TheTimeLine v-show="currentPage === PAGE_TIMELINE" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
