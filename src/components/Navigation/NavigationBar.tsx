import { Nav } from './Navigation.styled';
import { NavigationModel, NavigationVariables } from '../../models/navigation';
import { Button } from '../styles';

const NavigationBar = ({ onClickHandler }: { onClickHandler: NavigationVariables }): JSX.Element => {
  return (
    <Nav>
      <Button onClick={() => onClickHandler(NavigationModel.previous)}>&lt; Previous</Button>
      <Button onClick={() => onClickHandler(NavigationModel.next)}>Next &gt;</Button>
    </Nav>
  );
};

export default NavigationBar;
