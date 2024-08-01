const addItemsCart = (cart, cartItems) => {
    let dbCartItems = cart.cartItems;
    console.log(dbCartItems, cartItems);

    cartItems.forEach((item) => {
        const existItem = dbCartItems.find((x) => x.product.toString() === item.product.toString());
        if (existItem) {
            // If item exists in DB cart, update it
            dbCartItems = dbCartItems.map((x) =>
                x.product.toString() === item.product.toString() ? { ...x, ...item } : x
            );
        } else {
            // If item does not exist in DB cart, add it
            dbCartItems = [...dbCartItems, item];
        }
    });

    console.log(dbCartItems, "Updated Cart Items");
    return dbCartItems;
};

module.exports = { addItemsCart };
