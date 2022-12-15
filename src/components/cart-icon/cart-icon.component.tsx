import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const CartIcon = () => {
  const { setIsCartOpenHandler, cartItems } = useContext(CartContext);

  const count = cartItems.length;

  return (
    <div className="cart-icon-container" onClick={setIsCartOpenHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{count}</span>
    </div>
  );
};

export default CartIcon;
