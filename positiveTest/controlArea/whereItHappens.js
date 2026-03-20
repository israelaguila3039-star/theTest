import { expect } from '@wdio/globals'
import thePlaceILogIn from '../stuff/loggingIn.js'
import weAreHere from '../stuff/weGotHere.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await thePlaceILogIn.open()

        await thePlaceILogIn.login('standard_user', 'secret_sauce')
        await expect(weAreHere.flashAlert).toBeExisting()
        await expect(weAreHere.flashAlert).toHaveText(
            expect.stringContaining('Swag Labs'))
    })
})
