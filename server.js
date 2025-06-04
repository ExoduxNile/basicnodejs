const http = require('http');

const server = http.createServer((req, res) => {
  // Check if the request is for adding numbers
  if (req.url.startsWith('/add')) {
    // Get the query parameters from the URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const num1 = parseFloat(url.searchParams.get('num1'));
    const num2 = parseFloat(url.searchParams.get('num2'));

    // Check if both numbers are valid
    if (!isNaN(num1) && !isNaN(num2)) {
      const sum = num1 + num2;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`The sum of ${num1} and ${num2} is ${sum}`);
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Please provide two valid numbers using ?num1= and ?num2= in the URL');
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome! Use /add?num1=5&num2=3 to add two numbers');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
