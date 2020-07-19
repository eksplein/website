describe('Sapper template app', () => {
	beforeEach(() => {
		cy.visit('/')
    });
    
    it('can do math with Jest-like matchers', () => {
		expect(5).toBeGreaterThan(2)
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'Welcome to your new Sapper Blog')
	});

	it('navigates to /about', () => {
		cy.get('nav a').contains('about').click();
		cy.url().should('include', '/about');
	});

	it('navigates to /blog', () => {
		cy.get('nav a').contains('blog').click();
		cy.url().should('include', '/blog');
	});
});