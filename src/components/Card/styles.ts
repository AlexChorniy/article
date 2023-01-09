import styled from 'styled-components';

export const Container = styled.section`
  background-color: whitesmoke;
  flex-grow: 1;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  padding-bottom: 15px;
`;
export const Title = styled.h2`
  margin: 0;
  padding-left: 5px;
  padding-right: 5px;
  height: 45px;
  line-height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const Image = styled.img`
  width: inherit;
`;
export const Link = styled.a`
  width: 100%;
`;
export const ButtonsBlock = styled.div`
  width: 100%;
  min-height: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;
export const TopBlock = styled.div`
  height: 90%;
`;
export const BottomBlock = styled.div`
  height: 10%;
`;
