import React from 'react';
import TodoTemplate from '../components/TodoTemplate';
import TodoHeader from '../components/TodoHeader';
import TodoList from '../components/TodoList';
import TodoCreate from '../components/TodoCreate';

function TodoHome() {
  return (
    <>
      <TodoTemplate>
        <TodoHeader />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}

export default TodoHome;
