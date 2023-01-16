import { useNavigate } from "react-router-dom";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

type Props = {
  imageUrl: string;
  title: string;
  route: string;
};

const DirectoryItem = ({ imageUrl, title, route }: Props) => {
  const navigate = useNavigate();

  const navigateToRoute = () => {
    navigate(route);
  };

  return (
    <DirectoryItemContainer onClick={navigateToRoute}>
      <BackgroundImage imageUrl={imageUrl} />

      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
