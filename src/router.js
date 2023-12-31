import { ref } from 'vue';
import { PAGE_TIMELINE } from './constants';
import { isPageValid } from './validators';

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

// при загрузке страницы считывает и валидирует хэш страницы
export function normalizePageHash() {
  const page = window.location.hash.slice(1)

  if(isPageValid(page)) {
    return page
  }
  window.location.hash = PAGE_TIMELINE

  return PAGE_TIMELINE
};