export const formatDecimal = (number) => {
    return (Math.round(number * 100) / 100).toFixed(2);
  };
  
  const calculateItemsPrice = (cartItems) => {
    return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  };
  
  const calculateTaxPrice = (itemsPrice) => {
    return Number(itemsPrice * 0.15);
  };
  
  const calculateShippingPrice = (itemsPrice) => {
    if(itemsPrice === 0){
      return 0;
    }
    return itemsPrice > 300 ? 0 : 15;
  };
  
  const calculateTotalPrice = (itemsPrice, taxPrice, shippingPrice) => {
    return Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice);
  };
  
  const calculateTotalCartItems = (cartItems) => {
    return cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
  };
  
  const updateCart = (state) => {
    const itemsPrice = calculateItemsPrice(state.cartItems);
    const taxPrice = calculateTaxPrice(itemsPrice);
    const shippingPrice = calculateShippingPrice(itemsPrice);
    const totalPrice = calculateTotalPrice(itemsPrice, taxPrice, shippingPrice);
    const totalCartItems = calculateTotalCartItems(state.cartItems);
  
    const updatedState = {
      ...state,
      itemsPrice: formatDecimal(itemsPrice),
      taxPrice: formatDecimal(taxPrice),
      shippingPrice: formatDecimal(shippingPrice),
      totalPrice: formatDecimal(totalPrice),
      totalCartItems: totalCartItems,
    };
  
    localStorage.setItem("cart", JSON.stringify(updatedState));
    return updatedState;
  };
  
  export default updateCart;
  