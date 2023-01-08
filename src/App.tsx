import React from 'react';
import { Main } from './App.styled';
import { useGetData } from './hooks/useGetData';
import Articles from './components/Articles/Articles';

function App() {
  const { data, navigate, deleteCardById } = useGetData();

  return (
    <Main>
      <Articles data={data} navClickHandler={navigate} deleteCardById={deleteCardById} />
    </Main>
  );
}

export default App;
