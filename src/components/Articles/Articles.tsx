import { Data } from '../../models/data';
import Card from '../Cards';
import { Container, Lists } from './styles';
import NavigationBar from '../Navigation';
import { NavigationR } from '../../models/navigation';

const Articles = ({ data, navClickHandler }: { data: Data[], navClickHandler: NavigationR }): JSX.Element => {
  return (
    <Container>
      <NavigationBar onClickHandler={navClickHandler} />
      <Lists>
        {data.map(({ title, url, imageUrl, id }) => (
          <Card key={id} title={title} url={url} imageUrl={imageUrl} />
        ))}
      </Lists>
    </Container>
  );
};

export default Articles;
