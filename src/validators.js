import { NAV_ITEMS, HOURS_IN_DAY } from './constants';

export function isPageValid(page) {
  // название страницы во внешнем свойстве должно совпадать
  // с одним из существующих страниц из NAV_ITEMS
  return Object.keys(NAV_ITEMS).includes(page)
};

export function isTimelineItemValid({ hour }) {
  return typeof hour === 'number' && hour >= 0 && hour < HOURS_IN_DAY
};