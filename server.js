import express from 'express';

const app = express();

app.use('/', express.static('public'));
app.use('/form', express.static('public2'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/users', async (req, res) => {
  
  setTimeout(async() => {
    const limit = req.query.limit 

    const users = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`).then(response => response.json())

    res.send(`
    <h1 class="text-2xl font-bold my-4">Users</h1>
    <ul>
      ${users.map(user => `<li>${user.name}</li>`).join('')}
    </ul>
  `);
  }, 2000)
});

app.post('/convert', (req, res) => {
  const fahrenheit = parseFloat(req.body.fahrenheit)
  const celsius = (fahrenheit - 32) * (5 / 9)

  res.send(`
    <p>Celsius: ${celsius.toFixed()}</p>
  `)
})

app.listen(3000, () => {
  console.log("Server running on 3000")
});