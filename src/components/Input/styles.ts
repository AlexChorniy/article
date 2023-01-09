import styled from 'styled-components';

export const Container = styled.div`
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 5px;
  padding-left: 5px;
  gap: 5px;
`;

export const TextInput = styled.input.attrs(({ ref }) => ({
  autocomplete: 'off',
  ref: ref,
}))`
  height: 20px;
  flex-grow: 1;
`;
