import TextEditor from "./App.vue";
import store from '../src/store.js'
import axios from "axios";

export default {
    install: (app, options) => {
        if (!window.axios) {
            window.axios = axios
        }

        app.component("TextEditor", TextEditor);
        app.use(store, 'textEditor');
    }
}
