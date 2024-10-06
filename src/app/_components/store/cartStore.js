import { createStore, createEvent } from 'effector';

// События для управления корзиной
export const addItem = createEvent();
export const removeItem = createEvent();
export const incrementItem = createEvent();
export const decrementItem = createEvent();

// Инициализация стора корзины с проверкой на выполнение в клиентской среде
const initialCart = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem('cart')) || [] : [];

export const cartStore = createStore(initialCart)
  .on(addItem, (state, item) => {
    const index = state.findIndex(({ product }) => product.id === item.product.id);
    if (index === -1) {
      return [...state, { product: item.product, quantity: 1 }];
    }
    return state.map((cartItem, idx) => (idx === index ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
  })
  .on(removeItem, (state, productId) => state.filter(({ product }) => product.id !== productId))
  .on(incrementItem, (state, productId) => state.map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item)))
  .on(decrementItem, (state, productId) => state.map((item) => {
    if (item.product.id === productId) {
      const newQuantity = item.quantity - 1;
      return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
    }
    return item;
  }).filter(Boolean));

// Сохранение состояния в localStorage при каждом обновлении, только на клиенте
if (typeof window !== 'undefined') {
  cartStore.watch((state) => {
    window.localStorage.setItem('cart', JSON.stringify(state));
  });
}
