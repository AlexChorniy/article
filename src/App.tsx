import React from 'react';
import { Main } from './App.styled';
import { useGetData } from './hooks/useGetData';
import Articles from './components/Articles';

function App() {
  const { data } = useGetData();
  return (
    <Main>
      <Articles data={data} />
    </Main>
  );
}

export default App;
