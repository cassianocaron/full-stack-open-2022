describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Cassiano Caron",
      username: "cassiano",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Blogs");
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("cassiano");
      cy.get("#password").type("password");
      cy.get("#login-btn").click();
      cy.contains("Cassiano Caron logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("cassiano");
      cy.get("#password").type("wrong");
      cy.get("#login-btn").click();
      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Cassiano Caron logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "cassiano", password: "password" });
    });

    it("a blog can be created", function () {
      cy.createBlog({
        title: "A blog created by cypress",
        author: "Cypress",
        url: "https://www.test.com/",
      });

      cy.contains("A blog created by cypress");
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "cypress",
          url: "https://www.test.com/",
        });
        cy.createBlog({
          title: "second blog",
          author: "cypress",
          url: "https://www.test.com/",
        });
        cy.createBlog({
          title: "third blog",
          author: "cypress",
          url: "https://www.test.com/",
        });
      });

      it("one of those can be liked", function () {
        cy.contains("third blog").parent().find("button").click();
        cy.get("#like-btn").click();
      });

      it("one of those can be deleted", function () {
        cy.contains("second blog").parent().find("button").click();
        cy.get("#delete-btn").click();
        cy.get("html").should("not.contain", "second blog");
      });

      it("they are ordered by the number of likes in descending order", async function () {
        cy.contains("third blog").parent().find("button").click();
        cy.get("#like-btn").click().wait(500).click().wait(500);
        cy.contains("third blog").parent().find("button").click();

        cy.contains("second blog").parent().find("button").click();
        cy.get("#like-btn")
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500);

        cy.get(".blog").eq(0).should("contain", "second blog");
        cy.get(".blog").eq(1).should("contain", "third blog");
        cy.get(".blog").eq(2).should("contain", "first blog");
      });
    });
  });
});
