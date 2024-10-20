import http from 'node:http';
import fs from 'node:fs/promises';
import open from 'open';

const interpolate = (html, data) => {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || '';
  });
};

const formatTodos = (todos) => {
  return todos
    .map((todo) => {
      return `
        <div class="bg-white shadow-lg rounded-lg p-6">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-lg font-semibold text-gray-900">${todo.content}</h2>
            <span class="text-sm text-gray-500 px-2 py-1 bg-gray-200 rounded-full">
              Priority: ${todo.priority}
            </span>
          </div>
          <div class="text-sm text-gray-600">
            Completed: 
            <span class="font-semibold text-${
              todo.isComplete ? 'green' : 'red'
            }-600">
              ${todo.isComplete ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      `;
    })
    .join('\n');
};

const createServer = (todos) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL('./template.html', import.meta.url).pathname;
    const template = await fs.readFile(HTML_PATH, 'utf-8');
    const html = interpolate(template, { todos: formatTodos(todos) });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
};

export const start = (todos, port) => {
  const server = createServer(todos);
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    open(`http://localhost:${port}`);
  });
};
