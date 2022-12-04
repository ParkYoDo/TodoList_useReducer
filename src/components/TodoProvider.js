import React, { createContext, useContext, useReducer, useRef } from 'react';

const initialState = {
  users: [
    {
      id: 0,
      name: '박요도',
      email: 'rucasian@korea.com',
      password: 'Sd0708r7b7!',
      phone: '010-7773-0037',
    },
    {
      id: 1,
      name: '박기태',
      email: 'scarletdemon@naver.com',
      password: 'Sd0708r7b7!',
      phone: '010-7997-1988',
    },
  ],
  isLogin: false,
  loginUser: {
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
  },
  todos: [
    {
      id: 0,
      writer: '박요도',
      title: '첫번째 글',
      content: '안녕하세요',
      done: false,
    },
    {
      id: 1,
      writer: '박요도',
      title: '두번째 글',
      content: '안뇽',
      done: false,
    },
    {
      id: 2,
      writer: '박요도',
      title: '세번째 글',
      content: '안뇽ㅋ',
      done: false,
    },
    {
      id: 3,
      writer: '박요도',
      title: '네번째 글',
      content: '안뇽ㅋㅋ',
      done: false,
    },
    {
      id: 4,
      writer: '박기태',
      title: '첫번째 글',
      content: '안뇽ㅋㅋ',
      done: false,
    },
    {
      id: 5,
      writer: '박기태',
      title: '두번째 글',
      content: '안뇽ㅋㅋ',
      done: false,
    },
  ],
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ISLOGIN_TRUE':
      return { ...state, isLogin: true };
    case 'ISLOGIN_FALSE':
      return { ...state, isLogin: false };
    case 'LOGINUSER_SET':
      return { ...state, loginUser: { ...action.loginUser } };
    case 'LOGINUSER_MODIFY':
      return {
        ...state,
        loginUser: { ...state.loginUser, [action.key]: action.value },
      };
    case 'TODO_REMOVE':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== parseInt(action.id)),
      };
    case 'TODO_TOGGLE':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === parseInt(action.id)
            ? { ...todo, done: !todo.done }
            : todo,
        ),
      };
    case 'TODO_CREATE':
      return { ...state, todos: [...state.todos, action.todo] };
    case 'TODO_MODIFY':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.writer === state.loginUser.name
            ? { ...todo, writer: action.writer }
            : todo,
        ),
      };
    case 'USER_ADD':
      return { ...state, users: [...state.users, action.user] };
    case 'USER_MODIFY':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === state.loginUser.id
            ? { ...user, [action.key]: action.value }
            : user,
        ),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextUserIdContext = createContext();
const TodoNextTodoIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const nextUserId = useRef(2);
  const nextTodoId = useRef(6);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextUserIdContext.Provider value={nextUserId}>
          <TodoNextTodoIdContext.Provider value={nextTodoId}>
            {children}
          </TodoNextTodoIdContext.Provider>
        </TodoNextUserIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextUserId() {
  const context = useContext(TodoNextUserIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextTodoId() {
  const context = useContext(TodoNextTodoIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
