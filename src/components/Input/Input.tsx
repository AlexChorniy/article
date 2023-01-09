import { SyntheticEvent } from 'react';
import { Container, TextInput } from './Input.styled';
import { Button } from '../styles';

type InputType = {
  onChangeHandler?: (event: SyntheticEvent) => void,
  text: string,
  onSaveHandler: () => void,
};

const Input = ({ onChangeHandler, text, onSaveHandler }: InputType): JSX.Element => (
  <Container>
    <TextInput value={text} type="text" onChange={onChangeHandler} />
    <Button onClick={onSaveHandler}>Save</Button>
  </Container>
);

export default Input;
