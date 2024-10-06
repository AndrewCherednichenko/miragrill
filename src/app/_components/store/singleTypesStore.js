// singleTypesStore.js
import { createStore, createEffect } from 'effector';

// Эффект для асинхронного получения данных из single type "contacts"
export const fetchContactsFx = createEffect(async () => {
  const response = await fetch('http://localhost:1337/api/contact?populate=*');
  const data = await response.json();
  return data;
});

// Стор для хранения данных single type "contacts"
export const contactsStore = createStore([])
  .on(fetchContactsFx.doneData, (_, result) => result.data);

// Эффект для асинхронного получения данных из single type "dataForPage"
export const fetchDataForPageFx = createEffect(async () => {
  const response = await fetch('http://localhost:1337/api/data-for-page?populate=*');
  const data = await response.json();
  return data;
});

// Стор для хранения данных single type "dataForPage"
export const dataForPageStore = createStore([])
  .on(fetchDataForPageFx.doneData, (_, result) => result.data);

// Эффект для асинхронного получения данных из single type "tableForBanquet"
export const fetchTableForBanquetFx = createEffect(async () => {
  const response = await fetch('http://localhost:1337/api/table-for-banquet?populate=*');
  const data = await response.json();
  return data;
});

// Стор для хранения данных single type "tableForBanquet"
export const tableForBanquetStore = createStore([])
  .on(fetchTableForBanquetFx.doneData, (_, result) => result.data);

// Эффект для асинхронного получения данных из single type "tableForKaraoke"
export const fetchTableForKaraokeFx = createEffect(async () => {
  const response = await fetch('http://localhost:1337/api/table-for-karaoke?populate=*');
  const data = await response.json();
  return data;
});

// Стор для хранения данных single type "tableForKaraoke"
export const tableForKaraokeStore = createStore([])
  .on(fetchTableForKaraokeFx.doneData, (_, result) => result.data);
