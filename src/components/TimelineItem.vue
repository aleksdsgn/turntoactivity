<script setup>
import { ref } from 'vue';
import { isTimelineItemValid } from '../validators';
import BaseSelect from './BaseSelect.vue';
import TimelineHour from './TimelineHour.vue';

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid,
  }
});


// каждой активности свой идентификатор
const options = [
  { value: 1, label: 'Coding' },
  { value: 2, label: 'Reading' },
  { value: 3, label: 'Training' },
];

// указываем извне какая именно опция селект элемента должна быть выбрана
// с его помощью можно будет выбрать активность для определенного часа
const selectedActivityId = ref(1);
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <!-- передаем опции в качестве внешнего свойства компоненту BaseSelect -->
    <BaseSelect
      :selected="selectedActivityId"
      :options="options"
      placeholder="Rest"
      @select="selectedActivityId = $event"
    />
  </li>
</template>