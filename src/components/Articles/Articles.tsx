import { Data, DeleteById } from '../../models/data';
import Card from '../Cards';
import { Container, Lists } from './styles';
import NavigationBar from '../Navigation';
import { NavigationVariables } from '../../models/navigation';

type ArticlesType = { data: Data[], navClickHandler: NavigationVariables, deleteCardById: DeleteById };

const Articles = ({ data, navClickHandler, deleteCardById }: ArticlesType): JSX.Element => {
  return (
    <Container>
      <NavigationBar onClickHandler={navClickHandler} />
      <Lists>
        {data.map(({ title, url, imageUrl, id }) => (
          <Card
            key={id}
            title={title}
            url={url}
            imageUrl={imageUrl}
            onDeleteHandler={() => deleteCardById(id)}
            onEditHandler={(text) => console.log(text)}
          />
        ))}
      </Lists>
    </Container>
  );
};

export default Articles;
