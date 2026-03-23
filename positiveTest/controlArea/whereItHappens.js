import { expect } from '@wdio/globals'
import { $ } from '@wdio/globals'
import thePlaceILogIn from '../stuff/loggingIn.js'


async function theTestIng(username, password, passSelector) {    
    
    describe('My Login application', () => {
        it('should login with valid credentials', async () => {
            await thePlaceILogIn.open()

            await thePlaceILogIn.login(username, password)
            await expect($(passSelector)).toBeExisting()
            await expect($(passSelector)).toHaveText(
                expect.stringContaining('Swag Labs'))
        })
    })

}
theTestIng("standard_user", "secret_sauce", '[class="app_logo"]');


theTestIng("problem_user", "secret_sauce", '[class="app_logo"]');

theTestIng("error_user", "secret_sauce", '[class="app_logo"]');
theTestIng("visual_user", "secret_sauce", '[class="app_logo"]');