// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("createBlog", ({ title, author, url }) => {
	cy.get("#clickToShow").click({ force: true });

	cy.get("#title").type(title, { force: true });
	cy.get("#author").type(author, { force: true });
	cy.get("#url").type(url, { force: true });
	cy.get("#createButton").click({ force: true });
	cy.contains("added");
});
Cypress.Commands.add("newBlog", ({ title, author, url, likes }) => {
	cy.request({
		method: "POST",
		url: "http://localhost:3003/api/blogs",
		headers: {
			Authorization: `Bearer ${JSON.parse(localStorage.getItem("loggedInUser")).token}`,
		},
		body: {
			title: title,
			author: author,
			url: url,
			likes: likes,
		},
	});
});
