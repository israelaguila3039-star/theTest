import { expect } from '@wdio/globals'
import thePlaceILogIn from '../stuff/loggingIn.js'
import weAreHere from '../stuff/weGotHere.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('standard_user', 'secret_sauce')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(
            expect.stringContaining('Swag Labs'))
    })
})
