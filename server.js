import http from 'node:http';

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.write('Hello World');
    res.end();
  } else if (req.url === '/' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      console.log(chunk.toString());
      body += chunk.toString();
    });
    req.on('end', () => {
      req.body = JSON.parse(body);
    });
    console.log(req.body);
    res.write('Hello World');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
