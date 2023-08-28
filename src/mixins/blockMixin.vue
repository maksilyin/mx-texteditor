<script>
import {ref, watch,} from 'vue';
import {useStore} from "vuex";
import DomHelper from "../classes/DomHelper.js";

export default {
    props: {
        blockId: Number,
        startValue: {
            default: null
        },
        select: {
            default: false
        },
        class: {
            default: ''
        }
    },
    setup(props) {
        const store = useStore('textEditor');
        const value = ref(store.getters.getBlock(props.blockId).value);
        let output = () => {};

        watch(value, (newValue) => {
            store.commit('updateBlock', [props.blockId, newValue, output()])
        });

        const setOutput = (handler) => {
            output = handler;
        }

        const keyDownHandler = (event) => {
            const keyCode = event.which;

            if (keyCode === 13) {
                event.preventDefault();
                store.dispatch('addBlockByCode', 'text');
            }
        }

        const onMouseupHandler = (event, value) => {
            const element = event.target;
            let selected_text = "";
            let range = null;

            if (window.getSelection) {
                range = window.getSelection().getRangeAt(0);
                selected_text = window.getSelection().toString();
            } else if (document.selection && document.selection.type !== "Control") {
                range = document.selection.createRange();
                selected_text = range.text;
            }

            if (selected_text !== "") {
                store.commit('setElementSelectTextCoordinates', DomHelper.getSelectionCoordinates());
                store.commit('setSelectedElement', element);
                store.state.selected = {
                    range: range,
                    value: value,
                }

                console.log(store.state.selected)
            }
            else {
                store.commit('setElementSelectTextCoordinates', null);
                store.commit('setSelectedElement', null);
                store.state.selected = {
                    range: null,
                    value: null,
                }
            }
        }

        const setElementSelect = (element, value) => {
            element.onmouseup = function () {
                let selected_text = "";
                let range = null;

                if (window.getSelection) {
                    range = window.getSelection().getRangeAt(0);
                    selected_text = window.getSelection().toString();
                } else if (document.selection && document.selection.type !== "Control") {
                    range = document.selection.createRange();
                    selected_text = range.text;
                }

                if (selected_text !== "") {
                    store.commit('setElementSelectTextCoordinates', DomHelper.getSelectionCoordinates());
                    store.commit('setSelectedElement', element);
                    store.state.selected = {
                        range: range,
                        value: value,
                    }

                    console.log(store.state.selected)
                }
                else {
                    store.commit('setElementSelectTextCoordinates', null);
                    store.commit('setSelectedElement', null);
                    store.state.selected = {
                        range: null,
                        value: null,
                    }
                }
            }
        }

        return {
            value,
            setOutput,
            keyDownHandler,
            setElementSelect,
            onMouseupHandler,
        }
    }
};
</script>
