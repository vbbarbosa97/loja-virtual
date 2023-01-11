import "./directory-item.styles.scss";

type Props = {
  imageUrl: string;
  title: string;
};

const DirectoryItem = ({ imageUrl, title }: Props) => {
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />

      <div className="directory-item-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
