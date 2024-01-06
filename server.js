import express from 'express';

const app = express();

app.use('/', express.static('public'));
app.use('/form', express.static('public2'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/search', async(req, res) => {
  const searchTerm = req.body.search?.toLowerCase()

  const response = await fetch(`https://jsonplaceholder.typicode.com/users`).then(response => response.json())

  const usersHtml = response.map(user => `
  <tr>
    <td><div class="my-4 p-2">${user.name}</div></td>
    <td><div class="my-4 p-2">${user.email}</div></td>
  </tr>
`).join('')

  if(!searchTerm) {
    return res.send(usersHtml)
  }

  const searchResults = response.filter((contact) => contact.name.toLowerCase().includes(searchTerm))

  if(!searchResults.length) {
    return res.send(`
    <tr>
      <td><div class="my-4 p-2">Your search for "${searchTerm}" didn't return any results</div><td>
    </tr>
    `)
  }

  const searchResultHtml = searchResults.map(user => `
    <tr>
      <td><div class="my-4 p-2">${user.name}</div></td>
      <td><div class="my-4 p-2">${user.email}</div></td>
    </tr>
  `).join('')



  return res.send(searchResultHtml)
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