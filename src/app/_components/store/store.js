// store.js
import {
  createStore,
  createEffect,
  createEvent,
  restore,
} from 'effector';

// Функции для работы с LocalStorage
// const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
// const loadFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key) || '[]');

// Эффекты для добавления и удаления товаров
export const addToCart = createEvent();
export const removeFromCart = createEvent();
export const addToComparison = createEvent();
export const removeFromComparison = createEvent();

// Эффект для асинхронного получения данных категорий
export const fetchCategoriesFx = createEffect(async () => {
  // const response = await fetch('http://admin.domain-for-interview.ru/api/categories?populate=*');
  const response = await fetch('http://localhost:1337/api/categories?populate=*');
  // const response = await fetch('http://172.20.10.2:1337/api/categories?populate=*');
  const data = await response.json();
  return data;
});

// Стор для хранения данных категорий
export const categoriesStore = createStore([])
  .on(fetchCategoriesFx.doneData, (_, result) => result.data);

// Эффект для асинхронного получения данных продуктов
export const fetchProductsFx = createEffect(async () => {
  // const response = await fetch('http://admin.domain-for-interview.ru/api/products?populate=*');
  const response = await fetch('http://localhost:1337/api/products?populate=*');
  // const response = await fetch('http://172.20.10.2:1337/api/products?populate=*');
  const data = await response.json();
  return data;
});

// Стор для хранения данных продуктов
export const productsStore = createStore([])
  .on(fetchProductsFx.doneData, (_, result) => result.data);

// -----------------------------------------------
