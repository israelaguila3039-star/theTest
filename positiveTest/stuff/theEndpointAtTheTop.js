import { browser } from '@wdio/globals'

export default class uRL {
    open (path) {
        return browser.url(`https://www.saucedemo.com/`)
    }
}
