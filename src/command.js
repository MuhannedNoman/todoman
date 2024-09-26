import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import {
  addTodo,
  getAllTodos,
  removeTodo,
  findTodo,
  updateTodo,
} from './todos.js';

const listTodos = (todos) => {
  todos.forEach((todo) => {
    console.log('\n');
    console.log(`ID: ${todo.id}`);
    console.log(`Task: ${todo.content}`);
    console.log(`Priority: ${todo.priority}`);
    console.log(`Done: ${todo.done ? '✅' : '❌'}`);
  });
};

yargs(hideBin(process.argv))
  .command(
    'new <task>',
    'create a new todo',
    (yargs) =>
      yargs.positional('task', { type: 'string', describe: 'the task to add' }),
    async (argv) => {
      const priority = argv.priority || 'Normal';
      const todo = await addTodo(argv.task, priority);
      console.log(todo);
    }
  )
  .options('priority', {
    alias: 'p',
    type: 'string',
    description: 'set the priority of the task',
  })
  .command(
    'list',
    'list all todos',
    () => {},
    async () => {
      listTodos(await getAllTodos());
    }
  )
  .command(
    'remove <id>',
    'remove a todo',
    (yargs) =>
      yargs.positional('id', {
        type: 'number',
        describe: 'the id of the todo to remove',
      }),
    async (yargs) => {
      const id = await removeTodo(yargs.id);
      if (id) {
        console.log(`Removed todo with id: ${id}`);
      } else {
        console.log(`Todo with id ${yargs.id} not found`);
      }
    }
  )
  .command(
    'clear',
    'remove all todos',
    () => {},
    async () => {
      await removeAllTodos();
      console.log('All todos removed');
    }
  )
  .command(
    'find <filter>',
    'find todos that match the filter',
    (yargs) =>
      yargs.positional('filter', {
        type: 'string',
        describe: 'the filter to apply',
      }),
    async (yargs) => {
      listTodos(await findTodo(yargs.filter));
    }
  )
  .command(
    'update <id>',
    'toggle the done status of a todo',
    (yargs) => {
      yargs.positional('id', {
        type: 'number',
        describe: 'the id of the todo to toggle',
      });
    },
    async (yargs) => {
      const todo = await updateTodo(yargs.id);
      if (todo) {
        listTodos([todo]);
      } else {
        console.log(`Todo with id ${yargs.id} not found`);
      }
    }
  )
  .parse();
