const http = require('http');
const { URL } = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const inputUrl = reqUrl.searchParams.get('url');

  // Set header
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (!inputUrl) {
    res.end("Please provide a URL in the query string like ?url=https://www.facebook.com/");
    return;
  }

  try {
    const parsedUrl = new URL(inputUrl);

    const response = `
URL components:
- Protocol: ${parsedUrl.protocol}
- Host: ${parsedUrl.host}
- Hostname: ${parsedUrl.hostname}
- Pathname: ${parsedUrl.pathname}
- Search: ${parsedUrl.search}
- Search Params: ${JSON.stringify(Object.fromEntries(parsedUrl.searchParams))}
- Hash: ${parsedUrl.hash}
    `.trim();

    res.end(response);
  } catch (error) {
    res.end("Invalid URL provided.");
  }
});

server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
