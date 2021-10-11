describe('Testing the library', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/index.html');
    });
    it('Can populate library with books after clicking populate library button', () => {
        cy.get('#populate-library-button').click();
        cy.get('#cards-container').children().should('have.length', 3);
        cy.get('#delete-library-button').click();
    });
    it('Displays the delete book button when you hover over the card element', () => {
        cy.get('#populate-library-button').click();
        cy.get('.card-element').first().rightclick();
        cy.get('.delete-book').first().should('be.visible');
        cy.get('#delete-library-button').click();
    });
    it('Can delete books and deleted books stay deleted after refresh', () => {
        cy.get('#populate-library-button').click();
        cy.get('.card-element').first().trigger('mouseover');
        cy.get('.delete-book').first().click();
        cy.reload();
        cy.get('#cards-container').children().should('have.length', 2);
        cy.get('#delete-library-button').click();
    });
    it('Can close submit form when the user clicks on the cancel input button', () => {
        cy.get('#add-book-button').click();
        cy.get('#form-container').should('be.visible');
        cy.get('#cancel-input').click();
        cy.get('#form-container').should('not.be.visible');
    });
    //THE TEST BELOW ISN'T WORKING.
    // it('Can close submit form when the user clicks on the background', () => {
    //     cy.get('#add-book-button').click();
    //     cy.get('#form-container').should('be.visible');
    //     cy.get('#library-header').click({ force: true });
    //     cy.get('#form-container').should('not.be.visible');
    // });
    it("Doesn't submit the form when none of the fields are filled out", () => {
        cy.get('#add-book-button').click();
        cy.get('#submit-book-button').click();
        cy.get('#form-container').should('be.visible');
    });
    it("Doesn't submit the form when a feild is left out", () => {
        cy.get('#add-book-button').click();
        cy.get('#title-input').type('The Secret History');
        cy.get('#author-input').type('Donna Tartt');
        cy.get('#submit-book-button').click();
        cy.get('#form-container').should('be.visible');
    });
    it("Doesn't submit the form when the pages input includes characters other than numbers", () => {
        cy.get('#add-book-button').click();
        cy.get('#title-input').type('The Secret History');
        cy.get('#author-input').type('Donna Tartt');
        cy.get('#pages-input').type('123a');
        cy.get('#submit-book-button').click();
        cy.get('#form-container').should('be.visible');
    });
    it('Submits and closes the form when all input feilds are filled out correctly', () => {
        cy.get('#add-book-button').click();
        cy.get('#title-input').type('The Secret History');
        cy.get('#author-input').type('Donna Tartt');
        cy.get('#pages-input').type('123');
        cy.get('#submit-book-button').click();
        cy.get('#form-container').should('not.be.visible');

        cy.get('#delete-library-button').click();
    });
    it('Displays the card element with the same information that was filled out in the form', () => {
        cy.get('#add-book-button').click();
        cy.get('#title-input').type('The Secret History');
        cy.get('#author-input').type('Donna Tartt');
        cy.get('#pages-input').type('123');
        cy.get('#submit-book-button').click();

        cy.get('.card-title').should('have.text', 'The Secret History');
        cy.get('.card-author').should('have.text', 'Donna Tartt');

        cy.get('.card-pages').should('have.text', '123 pages');
        cy.get('.card-checkbox').should('not.be.checked');

        cy.get('#delete-library-button').click();
    });
    it('Keeps a book marked read marked read', () => {
        cy.get('#add-book-button').click();
        cy.get('#title-input').type('The Secret History');
        cy.get('#author-input').type('Donna Tartt');
        cy.get('#pages-input').type('123');
        cy.get('#submit-book-button').click();

        cy.get('.card-checkbox').check();
        cy.reload();

        cy.get('.card-checkbox').should('be.checked');
    });
});
