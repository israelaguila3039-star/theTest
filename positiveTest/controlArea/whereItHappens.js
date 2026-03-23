import { expect } from '@wdio/globals'
import { $ } from '@wdio/globals'
import thePlaceILogIn from '../stuff/loggingIn.js'


/**This function can control what is inputted for the password, username, the selector and the text within the selector
*This is due to neeeding to run multiple tests where the username and password are different and the assertions are different
*Notes: Errors can easily be caused by an update to the text, class names, src, etc...
*/

//All the valid usernames
const usernames = ["standard_user", "locked_out_user", "problem_user", "performance_glitch_user", "error_user", "visual_user"];

async function theTestIng(username, password, passSelector, stringNeed, passText) {    
    
    describe('My Login application', () => {
        it('should login with valid credentials', async () => {
            await thePlaceILogIn.open()

            await thePlaceILogIn.login(username, password)            
            await expect($(passSelector)).toBeExisting();
            if (stringNeed == true){
                await expect($(passSelector)).toHaveText(                    
                    expect.stringContaining(passText));
            }
        })
    })

}


//Positive Tests:


for (let i = 0; i < 6; i++){
    if (i == 1){
        theTestIng(usernames[i], "secret_sauce", '[class="error-message-container error"]', true, 'Epic sadface: Sorry, this user has been locked out.');
    } else if (i == 2 || i == 5) {
        theTestIng(usernames[i], "secret_sauce", '[src="/static/media/sl-404.168b1cce10384b857a6f.jpg"]', false, null);
    } else {
        theTestIng(usernames[i], "secret_sauce", '[class="app_logo"]', true, 'Swag Labs');
    }
}



//Negative Tests:


//Incorrect password
for (let i = 0; i < 6; i++){
    theTestIng(usernames[i], "ppppppp", '[class="error-message-container error"]', true, 'Epic sadface: Username and password do not match any user in this service');
}

//Removing "_" from username and created a value for it
const _lessUsernames = usernames.map(str => { return str.replaceAll('_', '') });
for (let i = 0; i < 6; i++){
    theTestIng(_lessUsernames[i], "secret_sauce", '[class="error-message-container error"]', true, 'Epic sadface: Username and password do not match any user in this service');
}

//Wrong capitalization
const capiUsernames = usernames.map(element => { return element.toUpperCase() });
//Note to self: Remember to put the [i] so that you do not take 20 minutes trying to solve an issue that does not actually exist
for (let i = 0; i < 6; i++){
    theTestIng(capiUsernames[i], "secret_sauce", '[class="error-message-container error"]', true, 'Epic sadface: Username and password do not match any user in this service');
}

//No password
for (let i = 0; i < 6; i++){
    theTestIng(usernames[i], "", '[class="error-message-container error"]', true, 'Epic sadface: Password is required');
}

//No username
theTestIng("", "secret_sauce", '[class="error-message-container error"]', true, 'Epic sadface: Username is required')

