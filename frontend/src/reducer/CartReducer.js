import cartDetails from "../utils/CartDetails";
import updateCart from "../utils/UpdateItems";

const initialState=localStorage.getItem("cart")
? JSON.parse(localStorage.getItem("cart"))
: { cartItems: [], wishList: []};



const cartReducer = (state=initialState,action)=>{
    switch (action.type) {
      case 'ADD_TO_CART':
       
        const list=action.payload;
        state.cartItems = cartDetails(state.cartItems, list);
        console.log(state,"cr");
        // localStorage.setItem("cart", JSON.stringify(state));
        return updateCart(state);
 
      case 'REMOVE_FROM_CART':
        return updateCart({
            ...state,
            cartItems:state.cartItems.filter((items)=> items.product !== action.payload ),
        }); 
      
      case 'SAVE_SHIPPING_ADDRESS':
                return {
                  ...state,
                  shippingAddress: action.payload,
                };
    //   case SAVE_PAYMENT_METHOD:
    //             return {
    //               ...state,
    //               paymentMethod: action.payload,
    //             };
      case 'CLEAR_CART':
        state.cartItems = [];
        return updateCart(state);
        
      case 'SAVE_CART':
        const {cartItems}=action.payload;
  
                return updateCart({
                  ...state,
                  cartItems,
                });      
      default:
         return state;
    };
    
};

export default cartReducer;