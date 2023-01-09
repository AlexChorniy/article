import {Data, DeleteById} from '../../models/data';
import Card from '../Card';
import {Container, Lists} from './styles';
import NavigationBar from '../Navigation';
import {NavigationVariables} from '../../models/navigation';

type ArticlesType = {
    data: Data[],
    navClickHandler: NavigationVariables,
    deleteCardById: DeleteById,
    onEditHandler: ({text, id}: { id: number; text: string }) => void,
};

const Articles = ({data, navClickHandler, deleteCardById, onEditHandler}: ArticlesType): JSX.Element => {
    return (
        <Container>
            <NavigationBar onClickHandler={navClickHandler}/>
            <Lists>
                {data.map(({title, url, imageUrl, id}) => (
                    <Card
                        key={id}
                        title={title}
                        url={url}
                        imageUrl={imageUrl}
                        onDeleteHandler={() => deleteCardById(id)}
                        onEditHandler={(text) => onEditHandler({text, id})}
                    />
                ))}
            </Lists>
        </Container>
    );
};

export default Articles;
