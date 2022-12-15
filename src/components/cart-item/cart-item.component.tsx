import { ProductCart } from "../../model/product.model";
import "./cart-item.styles.scss";

type Props = {
  productCart: ProductCart;
};

const CartItem = ({ productCart }: Props) => {
  return (
    <div className="cart-item-container">
      <img src={productCart.imageUrl} alt={productCart.name} />

      <div className="item-details">
        <span className="name">{productCart.name}</span>
        <span className="price">
          {productCart.quantity} x ${productCart.price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
