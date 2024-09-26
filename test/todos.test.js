import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
  getDB: jest.fn(),
  saveDB: jest.fn(),
  insertToDB: jest.fn(),
}));

const { insertToDB, getDB, saveDB } = await import('../src/db.js');
const { addTodo } = await import('../src/todos.js');

beforeEach(() => {
  insertToDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

it('should add a new todo', async () => {
  const todoContent = 'Clean the house';
  const priority = 'High';

  const mockTodo = { id: 123, content: todoContent, priority, done: false };

  insertToDB.mockResolvedValue(mockTodo);

  const result = await addTodo(todoContent, priority);

  expect(insertToDB).toHaveBeenCalledTimes(1);
  expect(result.content).toBe(todoContent);
});
