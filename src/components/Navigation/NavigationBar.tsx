import { Nav } from './Navigation.styled';
import { NavigationModel, NavigationVariables } from '../../models/navigation';
import { Button, ClearLSButton } from '../Component.styles';
import { workWithLS } from '../../utils/workWithLocalStorage';
import { ARTICLE_LS_KEY, DELETED_ID_KEYS, PAGE_KEY } from '../../utils/constants';

type NavigationBarType = {
  onClickHandler: NavigationVariables,
  isPrevButtonDisable: boolean,
  isNextButtonDisable: boolean,
};

const NavigationBar = ({
  onClickHandler,
  isPrevButtonDisable,
  isNextButtonDisable,
}: NavigationBarType): JSX.Element => {
  const onClearHandler = () => {
    workWithLS.removeData(PAGE_KEY);
    workWithLS.removeData(ARTICLE_LS_KEY);
    workWithLS.removeData(DELETED_ID_KEYS);
  };

  return (
    <Nav>
      <Button disabled={isPrevButtonDisable} onClick={() => onClickHandler(NavigationModel.previous)}>
        &lt; Previous
      </Button>
      <Button disabled={isNextButtonDisable} onClick={() => onClickHandler(NavigationModel.next)}>
        Next &gt;
      </Button>
      <ClearLSButton onClick={onClearHandler}>Clear LS</ClearLSButton>
    </Nav>
  );
};

export default NavigationBar;
