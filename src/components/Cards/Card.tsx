import { ButtonsBlock, Container, Image, Link, Title, TopBlock } from './styles';
import { Button } from '../Button/Button';

type CardType = {
  title: string,
  url: string,
  imageUrl: string,
  onDeleteHandler: () => void,
  onEditHandler: (text: string) => void,
};

const Card = ({ title, url, imageUrl, onDeleteHandler, onEditHandler }: CardType): JSX.Element => {
  return (
    <Container>
      <TopBlock>
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <Image alt="article image" src={imageUrl} />
        </Link>
        <Title>{title}</Title>
      </TopBlock>
      <ButtonsBlock>
        <Button onClick={() => onEditHandler(title)}>Edit</Button>
        <Button onClick={() => onDeleteHandler()}>Delete</Button>
      </ButtonsBlock>
    </Container>
  );
};

export default Card;
