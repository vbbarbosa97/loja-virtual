import "./category-item.styles.scss";

type Props = {
  imageUrl: string;
  title: string;
};

const CategoryItem = ({ imageUrl, title }: Props) => {
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
