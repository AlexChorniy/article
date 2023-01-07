import styled from 'styled-components';

export const Wrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;