<template>
    <component
        :is="tag"
        :contenteditable="contenteditable"
        @input="update"
        @blur="update"
        @paste="onPaste"
        @keypress="onKeypress"
        @mouseup="onMouseupHandler"
        ref="element"
    >
    </component>
</template>

<script>
import rangy from "rangy";
import {ref, onMounted, onBeforeMount, watch, defineComponent} from 'vue';
import {useStore} from "vuex";
import DomHelper from "../classes/DomHelper.js";


export default defineComponent({
    name: "EditorBlockList",

    props : {
        'tag': String,
        'contenteditable': {
            type: [Boolean, String],
            default: true,
        },
        'modelValue': String,
        'noHtml': {
            type: Boolean,
            default: true,
        },
        'noNl': {
            type: Boolean,
            default: true,
        },
        onPasteHandler: {
            default: null,
        },
        noSelect: {
            type: Boolean,
            default: true,
        }
    },
    setup(props, {emit}) {
        const element = ref(null);
        const store = useStore('textEditor');
        const lastSelection = ref(null);

        // eslint-disable-next-line no-unused-vars
        function replaceAll(str, search, replacement) {
            return str.split(search).join(replacement);
        }

        function currentContent() {
            return props.noHtml
                ? element.value?.innerText
                : element.value?.innerHTML;
        }

        function updateContent(newcontent) {
            if (props.noHtml) {
                element.value.innerText = newcontent;
            } else {
                element.value.innerHTML = newcontent;
            }
        }

        function update() {
            emit('update:modelValue', currentContent());
        }

        let onPaste = ref((event) => {
            event.preventDefault();
            let text = (event.originalEvent || event).clipboardData.getData('text/plain');
            if (props.noNl) {
                text = replaceAll(text, '\r\n', ' ');
                text = replaceAll(text, '\n', ' ');
                text = replaceAll(text, '\r', ' ');
            }
            window.document.execCommand('insertText', false, text);
        });

        function onKeypress(event) {
            if (event.key == 'Enter' && props.noNl) {
                event.preventDefault();
                emit('returned', currentContent());
            }
        }

        function onMouseupHandler() {
            store.commit('resetSelect');

            if (props.noSelect) {
                return;
            }
            setTimeout(() => {
                store.dispatch('updateSelection', element.value)
            });
        }

        onMounted(() => {
            updateContent(props.modelValue ?? '');

            if (DomHelper.isMobile()) {
                setInterval(()=> {
                    const sel = rangy.getSelection();

                    if (sel.type === 'Range' && lastSelection.value !== sel.toString()) {
                        lastSelection.value = sel.toString();
                        onMouseupHandler();
                    }
                    else if (sel.type === 'Caret') {
                        lastSelection.value = null;
                    }
                }, 200)
            }
        });

        onBeforeMount(() => {
            if (props.onPasteHandler) {
                onPaste.value = props.onPasteHandler;
            }
        });

        watch(() => props.modelValue, (newval) => {
            if (newval != currentContent()) {
                updateContent(newval ?? '');
            }
        });

        watch(() => props.noHtml, () => {
            updateContent(props.modelValue ?? '');
        });

        watch(() => props.tag, () => {
            updateContent(props.modelValue ?? '');
        }, {flush: 'post'});

        return {
            onKeypress,
            onPaste,
            update,
            element,
            onMouseupHandler
        }
    }
});
</script>
