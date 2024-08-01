const cartDetails = (cartItems, item) => {
    
    const existItem = cartItems.find((x) => item.product === x.product);
    if (existItem) {
        cartItems = cartItems.map((x) =>
            existItem.product === x.product ? item : x
        );
      
    } else {
        cartItems = [...cartItems, item];
       
    }

    return cartItems;
    
};

export default cartDetails;
