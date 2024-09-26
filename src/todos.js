import { saveDB, getDB, insertToDB } from './db.js';

export const addTodo = async (todo, priority) => {
  const newTodo = {
    id: Date.now(),
    content: todo,
    priority,
    done: false,
  };

  await insertToDB('todos', newTodo);
  return newTodo;
};

export const getAllTodos = async () => {
  const db = await getDB();
  return db.todos;
};

export const findTodo = async (filter) => {
  const todos = await getAllTodos();
  return todos.filter((todo) =>
    todo.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeTodo = async (id) => {
  const todos = await getAllTodos();
  const match = todos.find((todo) => todo.id === id);

  if (match) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    await saveDB({ todos: newTodos });
    return id;
  }

  return null;
};

export const removeAllTodos = async () => {
  await saveDB({ todos: [] });
};

export const updateTodo = async (id) => {
  const todos = await getAllTodos();
  const match = todos.find((todo) => todo.id === id);

  if (match) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });

    await saveDB({ todos: newTodos });
    return {
      ...match,
      done: !match.done,
    };
  }

  return null;
};
