<script setup>
import { ref, computed, provide } from 'vue';
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants';
import {
  generateTimeLineItems,
  generateActivities,
  generateActivitySelectOptions,
  generatePeriodSelectOptions,
} from './functions';
import { currentPage, timelineRef } from './router';
import TheHeader from './components/TheHeader.vue';
import TheNav from './components/TheNav.vue';
import TheActivities from './pages/TheActivities.vue';
import TheProgress from './pages/TheProgress.vue';
import TheTimeLine from './pages/TheTimeline.vue';

const activities = ref(generateActivities());

// данные временной шкалы
const timelineItems = ref(generateTimeLineItems(activities.value));

const activitySelectOptions = computed(() => generateActivitySelectOptions(activities.value));

function createActivity(activity) {
  activities.value.push(activity)
};

function deleteActivity(activity) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })
  
  activities.value.splice(activities.value.indexOf(activity), 1)
};

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
};

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
};

provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds);
provide('setActivitySecondsToComplete', setActivitySecondsToComplete);
provide('setTimelineItemActivity', setTimelineItemActivity);
provide('createActivity', createActivity);
provide('deleteActivity', deleteActivity);
provide('activitySelectOptions', activitySelectOptions.value);
provide('periodSelectOptions', generatePeriodSelectOptions());
provide('timelineItems', timelineItems.value);
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeLine
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      ref="timelineRef"
    />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>
