import { ref } from 'vue';
import { PAGE_TIMELINE } from './constants';
import { normalizePageHash } from './functions';

export const timelineRef = ref();

// определение конкретной страницы для подсветки пункта меню
export const currentPage = ref(normalizePageHash());

// перемещение между страницами
export function navigate(page) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timelineRef.value.scrollToHour()
  } else if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }

  currentPage.value = page
};