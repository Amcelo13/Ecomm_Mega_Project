export const getCartSubtotal = (cartItems) => {
  return cartItems.reduce(
    (subtotal, item) => subtotal + item.price * item.quantity,
    0
  );
};
