<script setup>
import { inject } from 'vue';
import { isHourValid, isTimelineItemValid } from '../validators';
import BaseSelect from './BaseSelect.vue';
import TimelineHour from './TimelineHour.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  },
});

const emit = defineEmits({
  scrollToHour: isHourValid,
});

const setTimelineItemActivity = inject('setTimelineItemActivity');
const activitySelectOptions = inject('activitySelectOptions');
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />
    <!-- передаем опции в качестве внешнего свойства компоненту BaseSelect -->
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>