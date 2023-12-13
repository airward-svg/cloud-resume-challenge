/// <reference types="Cypress" />

describe('Initial Page Load', () => {
  beforeEach(() => {
    cy.visit('https://dawarjafri.com')
    //cy.visit('http://localhost:8000/')
  })

  it('content checking', () => {
    cy.get('title').contains('Dawar Jafri')
    cy.get('html').should('exist');
    cy.get('link[rel="stylesheet"]').should('have.attr', 'href').and('include', 'style.css');
    cy.get('.fas, .fab, .far', { timeout: 10000 }).should('be.visible');
    cy.get('script[src="app.js"]').should('exist');
    cy.get('#viewsBadge').should('be.visible');
    cy.get('header h1').should('have.text', 'Dawar Jafri');
  })

  it('should test external links', () => {
    cy.get('.contact-icons a[href="https://www.linkedin.com/in/dawarabbasjafri"]').should('exist');
    cy.get('.contact-icons a[href="https://github.com/airward-svg"]').should('exist');
  });

  it('should simulate view count update via API', () => {
    cy.intercept('GET', '**/updateViewCount', { body: '1' }).as('updateViewCount');
    cy.reload();
    cy.wait('@updateViewCount');
    cy.get('#viewsBadge').should('have.text', 'Views: 1');
  });

  it('should update the database when API is called', () => {
    cy.intercept('GET', 'https://4zla3hu6mj.execute-api.us-east-1.amazonaws.com/prod/updateViewCount').as('updateRequest');
    cy.visit('https://dawarjafri.com');
    cy.wait('@updateRequest').then((interception) => {
      const responseBody = interception.response.body;
      const updatedViewCount = responseBody;
      expect(responseBody).eq(updatedViewCount);
    });
  });

  it('should update the database when making a GET request', () => {
    cy.request({
      method: 'GET',
      url: 'https://4zla3hu6mj.execute-api.us-east-1.amazonaws.com/prod/updateViewCount',
    }).then((response) => {
      const updatedValue = response.body;
      expect(response.status).to.eq(200);
      expect(updatedValue).to.exist;

      const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');

      const client = new DynamoDBClient();
      const params = {
        TableName: 'visit-count',
        Key: {
          id: { S: '0' },
        },
      };

      const command = new GetItemCommand(params);

      client.send(command)
        .then((response) => {
          const viewCountAttributeValue = response.Item.view_count.N;
          expect(updatedValue.toString()).to.eq(viewCountAttributeValue);
        })
    });
  });
})