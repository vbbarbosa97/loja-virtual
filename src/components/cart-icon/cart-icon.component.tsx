import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
  const { setIsCartOpenHandler, cartItems } = useContext(CartContext);

  const count = cartItems.length;

  return (
    <CartIconContainer onClick={setIsCartOpenHandler}>
      <ShoppingIcon />
      <ItemCount>{count}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
