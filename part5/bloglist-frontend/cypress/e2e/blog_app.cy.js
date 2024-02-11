// spell-checker: disable
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Roberto Quintana",
      username: "rrquintana",
      password: "password123",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000/");
  });

  it("front page can be opened", function () {
    cy.contains("blogs");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("rrquintana");
    cy.get("#password").type("password123");
    cy.get("#login-button").click();
    cy.contains("Roberto Quintana logged-in");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "rrquintana", password: "password123" });
    });

    /*
    it.only("a new blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("test blog");
      cy.get("#url").type("test url");
      cy.get("#create-blog-button").click();
      cy.contains("test blog");
    });
    */
    it("a new blog can be created", function () {
      cy.createBlog({ title: "test blog", url: "test url" });
      cy.contains("test blog");
    });

    it("a blog can be liked", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("test blog");
      cy.get("#url").type("test url");
      cy.get("#create-blog-button").click();
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("Likes: 1");
    });

    it("a blog can be deleted", function () {
      cy.createBlog({ title: "test blog", url: "test url" });
      cy.contains("test blog");
      cy.contains("view").click();
      cy.contains("delete").click();
      cy.get("html").should("not.contain", "test blog");
    });

    it("a closed session is not able to eliminate a blog", function () {
      cy.createBlog({ title: "test blog", url: "test url" });
      cy.contains("test blog");
      cy.contains("logout").click();
      cy.contains("view").click();
      cy.contains("delete").click();
      cy.get("html").should("contain", "test blog");
    });

    it.only("blogs are ordered by likes", function () {
      cy.createBlog({ title: "Ccc333", url: "test url 3" });
      cy.createBlog({ title: "Bbb222", url: "test url 2" });
      cy.createBlog({ title: "Aaa111", url: "test url" });

      cy.contains("Aaa111").parent().within(()=>{
        cy.contains("view").click()
      })

      cy.contains("Aaa111").parent().within(()=>{
        cy.contains("like").click().wait(1000).click().wait(1000).click()
        cy.contains("cancel").click();
      })

      cy.contains("Bbb222").parent().within(()=>{
        cy.contains("view").click();
        cy.contains("like").click().wait(1000).click().wait(1000);
        cy.contains("cancel").click();
      })

      cy.contains("Ccc333").parent().within(()=>{
        cy.contains("view").click();
        cy.contains("like").click().wait(1000);
        cy.contains("cancel").click();
      })

      cy.visit("http://localhost:3000");

      cy.get(".blog").then(blogs => {
        cy.wrap(blogs[0]).contains("Aaa111");
        cy.wrap(blogs[1]).contains("Bbb222");
        cy.wrap(blogs[2]).contains("Ccc333");
      });

    });
  });
});

describe("failed login", function () {
  it("fails with wrong credentials", function () {
    cy.visit("http://localhost:3000");
    cy.contains("login").click();
    cy.get("#username").type("rrquintana");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();
    cy.get(".error").should("contain", "Wrong credentials");
    //.and("have.css", "color", "rgb(255, 0, 0)")
    cy.get("html").should("not.contain", "Roberto Quintana logged-in");
  });
});
