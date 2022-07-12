import React, { useState ,useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const getLocalItmes = () => {
  let list = localStorage.getItem('lists');
  if (list) {
      return JSON.parse(`${list}`);
  } else {
      return [];
  }
}

function TodoListItem() {
  const [todos, setTodos] = useState(getLocalItmes());
  console.log(todos , 'todos');

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos ,'todo list ');
  };

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todos))
    
  }, [todos]);

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What is your job today?</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoItem
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoListItem;