import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Leo'},
    { id: 2, name: 'Lao'},
    { id: 3, name: 'Lio'}
  ]

  res.send(`
    <h1 class="text-2xl font-bold my-4">Users</h1>
    <ul>
      ${users.map(user => `<li>${user.name}</li>`).join('')}
    </ul>
  `);
});

app.listen(3000, () => {
  console.log("Server running on 3000")
});