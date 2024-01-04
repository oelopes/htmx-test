import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/users', async (req, res) => {
  // const users = [
  //   { id: 1, name: 'Leo'},
  //   { id: 2, name: 'Lao'},
  //   { id: 3, name: 'Lio'}
  // ]

  setTimeout(async() => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())

    res.send(`
    <h1 class="text-2xl font-bold my-4">Users</h1>
    <ul>
      ${users.map(user => `<li>${user.name}</li>`).join('')}
    </ul>
  `);
  }, 2000)
});

app.listen(3000, () => {
  console.log("Server running on 3000")
});