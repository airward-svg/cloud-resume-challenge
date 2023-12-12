import 'cypress-axe'
Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('viewsBadge is not defined')) {
        return false
    }
})