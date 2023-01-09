import styled from 'styled-components';

export const Main = styled.main`
  height: 100%;
  width: 90%;
  margin: 0 auto;
  background-color: lightgrey;
  overflow-y: scroll;
`;

export const Wrapper = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
