import { Data } from '../../models/data';
import Card from '../Cards';
import { Wrapper } from './styles';

const Articles = ({ data }: { data: Data[] }): JSX.Element => {
  return (
    <Wrapper>
      {data
        .filter((_, index) => index <= 10)
        .map(({ title, url, imageUrl, id }) => (
          <Card key={id} title={title} url={url} imageUrl={imageUrl} />
        ))}
    </Wrapper>
  );
};

export default Articles;
