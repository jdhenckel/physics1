import axios from 'axios';
import { Utils } from './utils';

// The window.app is a global pointer to the singleton of this class.

export class MainApp {

    boot() {
        console.log('Hello world!');
        alert('Hello world.');
    }
}
//********************************************************************
// MAIN ENTRY POINT
// The window will exist in a browser, but will not exist in headless mode (such as jasmine)
//********************************************************************
if (typeof window !== 'undefined') {
    new MainApp().boot();
}