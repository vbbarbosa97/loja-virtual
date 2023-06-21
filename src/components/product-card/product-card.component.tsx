import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../model/product.model";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import "./product-card.styles.scss";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProduct = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={product.name} />

      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>

      <Button typeClass="inverted" onClick={addProduct}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
