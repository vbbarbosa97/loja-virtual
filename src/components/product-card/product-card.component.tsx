import { Product } from "../../model/product.model";
import Button from "../button/button.component";
import "./product-card.styles.scss";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card-container">
      <img src={product.imageUrl} alt={product.name} />

      <div className="footer">
        <span className="name">{product.name}</span>
        <span className="price">{product.price}</span>
      </div>

      <Button typeClass="inverted"> Add to card</Button>
    </div>
  );
};

export default ProductCard;
