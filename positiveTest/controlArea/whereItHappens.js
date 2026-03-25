import { expect } from '@wdio/globals'
import { $ } from '@wdio/globals'
import { selectors } from '../stuff/whatPasses.js'
import thePlaceILogIn from '../stuff/loggingIn.js'
import { allUsernames } from '../stuff/loggingIn.js'


/**This function can control what is inputted for the password, username, the selector and the text within the selector
*This is due to neeeding to run multiple tests where the username and password are different and the assertions are different
*Notes: Errors can easily be caused by an update to the text, class names, src, etc...
*/
async function theTestIngLogin(username, password, passSelector, stringNeed, passText) {    
    
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



//Login Positive Tests:


allUsernames[0].forEach((username, i) => {
    if (i === 1) {
        theTestIngLogin(username, "secret_sauce", selectors.errorMessage, true, 'Epic sadface: Sorry, this user has been locked out.');
    } else if (i === 2 || i === 5) {
        theTestIngLogin(username, "secret_sauce", selectors.pugImage, false, null);
    } else {
        theTestIngLogin(username, "secret_sauce", selectors.appLogo, true, 'Swag Labs');
    }
});



//Login Negative Tests:


//Incorrect password
allUsernames[0].forEach((username) => {
    theTestIngLogin(username, "ppppppp", selectors.errorMessage, true, 'Epic sadface: Username and password do not match any user in this service');
});

//Removing "_" from username and created a value for it
allUsernames[1].forEach((username) => {
    theTestIngLogin(username, "secret_sauce", selectors.errorMessage, true, 'Epic sadface: Username and password do not match any user in this service');
});

//Removing the "_" from the password
allUsernames[0].forEach((username) => {
    theTestIngLogin(username, "secretsauce", selectors.errorMessage, true, 'Epic sadface: Username and password do not match any user in this service');
});

//Wrong capitalization on the usernames
allUsernames[2].forEach((username) => {
    theTestIngLogin(username, "secret_sauce", selectors.errorMessage, true, 'Epic sadface: Username and password do not match any user in this service');
});

//Wrong capitalization on the password
allUsernames[0].forEach((username) => {
    theTestIngLogin(username, "SECRET_SAUCE", selectors.errorMessage, true, 'Epic sadface: Username and password do not match any user in this service');
});

//No password
allUsernames[0].forEach((username) => {
    theTestIngLogin(username, "", selectors.errorMessage, true, 'Epic sadface: Password is required');
});

//No username
theTestIngLogin("", "secret_sauce", selectors.errorMessage, true, 'Epic sadface: Username is required')

//Replace all "_" with " "
allUsernames[3].forEach((username) => {
    theTestIngLogin(username, "secret_sauce", selectors.errorMessage, true, 'Epic sadface: Username and password do not match any user in this service');
});

//Capitalize first letter of each word, usernames
allUsernames[4].forEach((username) => {
    theTestIngLogin(username, "secret_sauce", selectors.errorMessage, true, 'Epic sadface: Username and password do not match any user in this service');
});