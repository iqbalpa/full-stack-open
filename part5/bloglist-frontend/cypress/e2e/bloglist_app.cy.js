describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		cy.request("POST", "http://localhost:3003/api/users/signup", {
			name: "iqbal",
			username: "iqbalpa",
			password: "helo",
		}).then((response) => {
			cy.request("POST", "http://localhost:3003/api/users/login", {
				username: "iqbalpa",
				password: "helo",
			}).then((res) => {
				localStorage.setItem("loggedInUser", JSON.stringify(res.body));
				console.log(localStorage.getItem("loggedInUser"));
			});
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
			cy.visit("http://localhost:3000");
			cy.get("#username").type("iqbalpa", { force: true });
			cy.get("#password").type("helo", { force: true });
			cy.get("#loginButton").click({ force: true });
		});

		it("A blog can be created", function () {
			cy.get("#clickToShow").click({ force: true });

			cy.get("#title").type("blog 1", { force: true });
			cy.get("#author").type("lebron", { force: true });
			cy.get("#url").type("google.com", { force: true });
			cy.get("#createButton").click({ force: true });
			cy.contains("added");
		});

		it("User can like a blog", function () {
			cy.createBlog({
				title: "blog 1",
				author: "lebron james",
				url: "google.com",
			});
			cy.get("#view").click({ force: true });
			cy.get(".likeButton").should("be.visible");
		});

		it("user can delete a blog", function () {
			cy.createBlog({
				title: "blog 1",
				author: "lebron james",
				url: "google.com",
			});
			cy.get(".deleteButton").click({ force: true });
			cy.get("html").should("not.contain", "blog 1");
		});

		it("only blog creator can see the remove button", function () {
			// i don't handle this on my frontend code
		});

		it.only("blogs are ordered by numbers of likes", function () {
			cy.newBlog({ title: "blog 1", author: "author 1", url: "google.com", likes: 10 });
			cy.newBlog({ title: "blog 2", author: "author 1", url: "google.com", likes: 1 });

			cy.get(".blog > *").eq(0).should("contain", "blog 1");
			cy.get(".blog > *").eq(1).should("contain", "blog 2");
		});
	});
});
