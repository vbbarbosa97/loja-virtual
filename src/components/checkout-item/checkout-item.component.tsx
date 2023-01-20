import { useDispatch, useSelector } from "react-redux";
import { ProductCart } from "../../model/product.model";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import "./checkout-item.styles.scss";

type Props = {
  product: ProductCart;
};

const CheckoutItem = ({ product }: Props) => {
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(clearItemFromCart(cartItems, product));
  };

  const incrementHandler = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  const decrementHandler = () => {
    dispatch(removeItemFromCart(cartItems, product));
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <span className="name">{product.name}</span>

      <span className="quantity">
        <div className="arrow" onClick={decrementHandler}>
          &#10094;
        </div>

        <span className="value">{product.quantity}</span>

        <div className="arrow" onClick={incrementHandler}>
          &#10095;
        </div>
      </span>

      <span className="price">{product.price}</span>

      <span className="remove-button" onClick={removeItem}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
