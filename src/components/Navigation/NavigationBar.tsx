import { Button } from '../Button/Button';
import { Nav } from './styles';
import { NavigationModel, NavigationR } from '../../models/navigation';

const NavigationBar = ({ onClickHandler }: { onClickHandler: NavigationR }): JSX.Element => {
  return (
    <Nav>
      <Button onClick={() => onClickHandler(NavigationModel.previous)}>&lt; Previous</Button>
      <Button onClick={() => onClickHandler(NavigationModel.next)}>Next &gt;</Button>
    </Nav>
  );
};

export default NavigationBar;
