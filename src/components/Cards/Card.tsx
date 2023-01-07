import { ButtonsBlock, Container, Image, Link, Title, TopBlock } from './styles';
import { Button } from '../Button/Button';

const Card = ({ title, url, imageUrl }: { title: string, url: string, imageUrl: string }): JSX.Element => {
  return (
    <Container>
      <TopBlock>
        <Link href={url} target="_blank" rel="noopener noreferrer">
          <Image alt="article image" src={imageUrl} />
        </Link>
        <Title>{title}</Title>
      </TopBlock>
      <ButtonsBlock>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </ButtonsBlock>
    </Container>
  );
};

export default Card;
