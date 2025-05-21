const express = require('express');
const app = express();
const port = 3000;

// Add middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>X-Stock</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
      </style>
    </head>
    <body>
      <h1>Hello World from X-Stock!</h1>
      <form action="/submit" method="POST">
        <input type="text" name="stockSymbol" placeholder="Enter stock symbol...">
        <button type="submit">Submit</button>
      </form>
    </body>
    </html>
  `);
});

// Handle form submission
app.post('/submit', (req, res) => {
  const stockSymbol = req.body.stockSymbol;
  res.send(`You entered: ${stockSymbol}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 