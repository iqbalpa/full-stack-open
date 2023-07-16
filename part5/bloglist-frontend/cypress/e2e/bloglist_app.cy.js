describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		cy.request("POST", "http://localhost:3003/api/users/signup", {
			name: "iqbal",
			username: "iqbalpa",
			password: "helo",
		}).then((response) => {
			localStorage.setItem("loggedInUser", JSON.stringify(response.body));
			cy.visit("http://localhost:3000");
		});
	});

	it("Login form is shown", function () {
		cy.contains("log in to application");
		cy.contains("username");
		cy.contains("password");
		cy.contains("login");
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("#username").type("iqbalpa", { force: true });
			cy.get("#password").type("helo", { force: true });
			cy.get("#loginButton").click({ force: true });
			cy.contains("logged in");
		});

		it("fails with wrong credentials", function () {
			cy.get("#username").type("iqbalpa", { force: true });
			cy.get("#password").type("wrong", { force: true });
			cy.get("#loginButton").click({ force: true });
			cy.contains("wrong username or password");
		});
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.get("#username").type("iqbalpa", { force: true });
			cy.get("#password").type("helo", { force: true });
			cy.get("#loginButton").click({ force: true });
		});

		it.only("A blog can be created", function () {
			cy.get("#clickToShow").click({ force: true });

			cy.get("#title").type("blog 1", { force: true });
			cy.get("#author").type("lebron", { force: true });
			cy.get("#url").type("google.com", { force: true });
			cy.get("#createButton").click({ force: true });
			cy.contains("added");
		});
	});
});
