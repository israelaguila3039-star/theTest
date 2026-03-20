import { $ } from '@wdio/globals'
import uRL from './theEndpointAtTheTop.js';

class thePlaceILogIn extends uRL {

    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open () {
        return super.open('login');
    }
}

export default new thePlaceILogIn();
