import express from 'express';

const app = express();

app.use('/', express.static('public'));
app.use('/form', express.static('form'));

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

app.post('/contact', (req, res) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName

  return res.send(`
    <p class="text-lg mb-2">Contact created</span>
    <p class="text-sm"><b>Email:</b> ${email}</p>
    <p class="text-sm"><b>FirstName:</b> ${firstName}</p>
    <p class="text-sm"><b>LastName:</b> ${lastName}</p>
  `)
})

app.post('/contact/email', (req, res) => {
  const submittedEmail = req.body.email
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  const isValid = {
    message: 'Email is valid',
    class: 'text-green-700'
  }

  const isInvalid = {
    message: 'Please enter a valid email',
    class: 'text-red-700'
  }

  if(!emailRegex.test(submittedEmail)) {
    return res.send(`
      <div class="mb-4" hx-target="this" hx-swap="outerHTML">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email Address</label>

        <input 
          id="email"
          class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          type="email"
          name="email"
          required
          hx-post="/contact/email"
          value="${submittedEmail}"
        />

        <div class="${isInvalid.class}">${isInvalid.message}</div>
      </div>
    `)
  }

  return res.send(` 
    <div class="mb-4" hx-target="this" hx-swap="outerHTML">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email Address</label>

      <input 
        id="email"
        class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
        type="email"
        name="email"
        required
        hx-post="/contact/email"
        value="${submittedEmail}"
      />

      <div class="${isValid.class}">${isValid.message}</div>
    </div>
  `)

})

app.listen(3000, () => {
  console.log("Server running on 3000")
});