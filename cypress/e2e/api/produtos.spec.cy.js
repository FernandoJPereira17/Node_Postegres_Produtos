/// <reference types="Cypress" />

describe ('GET retornando todos os produtos', ()=>{
        it('GET /produtos', ()=>{
            cy.request('http://127.0.0.1:5000/produtos')
            .its('status')
            .should('equal', 200)
        })
    }
)

describe('GET Retornando um produto específico', () => {
    it('GET /produto/id', () => {
        cy.request('http://127.0.0.1:5000/produto/1')
        .its('status')
        .should('equal', 200)
    })
})
