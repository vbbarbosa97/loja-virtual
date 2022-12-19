import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import { ProductCart } from "../../model/product.model";
import "./checkout-item.styles.scss";

type Props = {
  product: ProductCart;
};

const CheckoutItem = ({ product }: Props) => {
  const { clearItemFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);

  const removeItem = () => {
    clearItemFromCart(product);
  };

  const incrementHandler = () => {
    addItemToCart(product);
  };

  const decrementHandler = () => {
    removeItemToCart(product);
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
