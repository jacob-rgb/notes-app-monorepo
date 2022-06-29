Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', 'http://localhost:3001/api/auth/login', {
    username,
    password
  }).then(response => {
    const {ok, data} = response.body
    localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(data)
    )
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createNote', ({content, important}) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3001/api/notes',
    body: { content, important, userId: JSON.parse(localStorage.getItem('loggedNoteAppUser')).id},
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedNoteAppUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})