import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss";

type Categorie = {
  id: number;
  title: string;
  imageUrl: string;
};

type Props = {
  categories: Categorie[];
};

const Directory = ({ categories }: Props) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem
          key={category.id}
          imageUrl={category.imageUrl}
          title={category.title}
        />
      ))}
    </div>
  );
};

export default Directory;
