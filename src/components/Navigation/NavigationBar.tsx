import { Nav } from './Navigation.styled';
import { NavigationModel, NavigationVariables } from '../../models/navigation';
import { Button } from '../styles';
import { workWithLS } from '../../utils/workWithLocalStorage';
import { ARTICLE_LS_KEY, DELETED_ID_KEYS, PAGE_KEY } from '../../utils/constants';

const NavigationBar = ({ onClickHandler }: { onClickHandler: NavigationVariables }): JSX.Element => {
  const onClearHandler = () => {
    workWithLS.removeData(PAGE_KEY);
    workWithLS.removeData(ARTICLE_LS_KEY);
    workWithLS.removeData(DELETED_ID_KEYS);
  };

  return (
    <Nav>
      <Button onClick={() => onClickHandler(NavigationModel.previous)}>&lt; Previous</Button>
      <Button onClick={() => onClickHandler(NavigationModel.next)}>Next &gt;</Button>
      <Button onClick={onClearHandler}>Clear LS</Button>
    </Nav>
  );
};

export default NavigationBar;
