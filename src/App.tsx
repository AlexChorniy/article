import React from 'react';
import { Main, Wrapper } from './App.styled';
import { useGetData } from './hooks/useGetData';
import Articles from './components/Articles/Articles';

function App() {
  const { data, navigate, deleteCardById, update, loading, isError } = useGetData();

  if (loading) {
    return (
      <Wrapper>
        <img alt={'loading image'} src={require('./assets/loader.gif')} />
      </Wrapper>
    );
  }

  if (isError) {
    return <Wrapper>Something went wrong. Please contact with us</Wrapper>;
  }

  return (
    <Main>
      <Articles data={data} navClickHandler={navigate} deleteCardById={deleteCardById} onEditHandler={update} />
    </Main>
  );
}

export default App;
