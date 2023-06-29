<script setup>
import { ref, computed } from 'vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
import {
  normalizePageHash,
  generateTimeLineItems,
  generateActivities,
  generateActivitySelectOptions,
} from './functions';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import TheTimeLine from './pages/TheTimeLine.vue';

// определение конкретной страницы для подсветки пункта меню
const currentPage = ref(normalizePageHash());

// данные временной шкалы
const timelineItems = ref(generateTimeLineItems());

const activities = ref(generateActivities());

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

function goTo(page) {
  currentPage.value = page
};

function createActivity(activity) {
  activities.value.push(activity)
};

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
    }
  })
  
  activities.value.splice(activities.value.indexOf(activity), 1)
};

function setTimelineItemActivity({ timelineItem, activity }) {
  timelineItem.activityId = activity?.id || null
};
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TheTimeLine
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activities="activities"
      :activity-select-options="activitySelectOptions"
      @set-timeline-item-activity="setTimelineItemActivity"
    />
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @create-activity="createActivity"
      @delete-activity="deleteActivity"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
