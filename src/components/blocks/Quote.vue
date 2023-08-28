<template lang="pug">

.editor-quote(ref="inputBlock")
    contentEditable(
        class="editor-quote__text"
        tag="p",
        :no-select="false"
        :no-html="false"
        contenteditable="true"
        v-for="(textItem, index) in text"
        v-model="text[index]"
        @keypress="onPressTextHandler"
        @keydown="handleBackspace(index, $event)"
    )
    contentEditable(
        class="editor-quote__author"
        tag="p",
        contenteditable="true"
        v-model="author"
        :pressHandler="keyDownHandler"
        ref="inputBlockAuthor"
    )

</template>

<script>
import blockMixin from "../../mixins/blockMixin.vue";
import TextInput from "../../components/tools/TextInput.vue";
import contentEditable from '../../components/contenteditable.vue';
import {onMounted, ref, watch, computed, reactive} from "vue";
import DomHelper from "../../classes/DomHelper.js";

export default {
    name: "QuoteBlock",
    mixins: [blockMixin],
    components: {
        TextInput,
        contentEditable,
    },

    setup(props) {
        const data = blockMixin.setup(props);
        const inputBlock = ref(null);
        const inputBlockAuthor = ref(null);
        const { value, keyDownHandler } = data;
        const text = reactive(['']);
        const author = ref('')

        const isPlaceholder = computed(() => {
            return value.value === ''
        })

        data.setOutput(() => {
            let textHtml = '';

            if (value.value.text !== undefined) {
                value.value.text.forEach(textItem => {
                    textHtml += '<p class="quote-text">' + textItem + '</p>';
                });
            }

            return `<div class="quote-wrapper">${textHtml}<p class="quote-author">${ value.value.author }</p></div>`;
        });

        watch(text, (newValue) => {
            setValue(newValue, author.value)
        });

        watch(author, (newValue) => {
            setValue(text, newValue)
        });

        const setValue = (text, author) => {
            value.value = {
                text, author
            }
        }

        const onPressTextHandler = (event) => {
            const keyCode = event.which;

            if (keyCode === 13) {
                event.preventDefault();

                if (text[text.length - 1] !== '') {
                    text.push('');
                    setTimeout(() => {
                        getLastText().focus();
                    });
                }
                else if (text.length > 1) {
                    const index = text.length - 1;
                    if (index > 0) {
                        inputBlock.value.querySelector('.editor-quote__text:nth-child('+index+')').focus();
                    }
                    deleteTextElement(index);
                    inputBlockAuthor.value.$el.focus();
                }
            }
        }

        onMounted(() => {
            if (props.startValue) {
                props.startValue.text.forEach(item => {
                    if (text.length === 1 && text[0] === '') {
                        text[0] = item;
                    }
                    else {
                        text.push(item)
                    }
                });
                author.value = props.startValue.author;
            }

            const textElement = getLastText();

            if (textElement) {
                textElement.focus();
            }
        });

        const getLastText = () => {
            const texts = inputBlock.value.querySelectorAll('.editor-quote__text');

            if (texts.length) {
                return texts[texts.length - 1];
            }

            return null;
        }

        const handleBackspace = (index, event) => {
            const inputElement = event.target;
            const caretPos = DomHelper.getCaretPos(inputElement);

            if (event.key === 'Backspace' && text.length > 1 && (text[index] === '' || caretPos === 0)) {
                if (index > 0) {
                    inputBlock.value.querySelector('.editor-quote__text:nth-child('+index+')').focus();
                }
                deleteTextElement(index);
            }
        }

        const deleteTextElement = (index) => {
            text.splice(index, 1);
        }

        return {
            text,
            author,
            inputBlock,
            isPlaceholder,
            inputBlockAuthor,
            onPressTextHandler,
            keyDownHandler,
            handleBackspace
        }
    }
}
</script>

<style scoped lang="sass">
.editor-quote
    position: relative
    padding-left: 15px
    &:before
        content: ''
        position: absolute
        left: 0
        top: 0
        height: 100%
        width: 4px
        background-color: #1793E6
    &__text
        margin-bottom: 15px
    &__text
        font-size: 18px
        font-weight: 400
        margin-top: 0
</style>


<style lang="sass">
.editor-quote
    &__text
        p
            font-size: 18px
            font-weight: 400
</style>
