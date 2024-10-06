import { createStore, createEvent } from 'effector';

// События для сравнительной таблицы
export const addToCompare = createEvent();
export const removeFromCompare = createEvent();

// Инициализация стора сравнительной таблицы с проверкой на выполнение в клиентской среде
let initialCompareList = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('compareList') || '[]') : [];
if (!Array.isArray(initialCompareList)) {
  initialCompareList = [];
}

export const compareStore = createStore(initialCompareList)
  .on(addToCompare, (state, product) => {
    const index = state.findIndex(({ id }) => id === product.id);
    if (index === -1) {
      return [...state, product];
    }
    return state;
  })
  .on(removeFromCompare, (state, productId) => state.filter(({ id }) => id !== productId));

// Сохранение состояния в localStorage при каждом обновлении, только на клиенте
// if (typeof window !== 'undefined') {
//   compareStore.watch((state) => {
//     window.localStorage.setItem('compareList', JSON.stringify(state));
//   });
// }
