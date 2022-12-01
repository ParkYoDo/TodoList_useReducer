import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { TodoProvider } from './components/TodoProvider';
import TodoNav from './components/TodoNav';

const AppBlock = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e9ecef;
  body,
  html {
    margin: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <>
      <TodoProvider>
        <AppBlock>
          <TodoNav></TodoNav>
        </AppBlock>
      </TodoProvider>
    </>
  );
}

export default App;
