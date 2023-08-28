<template lang="pug">

component(:is="tag" class="editor-list" ref="listElement")
    contentEditable(
        tag="li",
        :no-select="false"
        :no-html="false"
        contenteditable="true"
        v-for="(listItem, index) in list"
        :key="index" v-model="list[index]"
        @keypress="addElement(index, $event)"
        @keydown="handleBackspace(index, $event)"
    )

</template>

<script>
import blockMixin from "../../mixins/blockMixin.vue";
import contentEditable from '../../components/contenteditable.vue';
import {onMounted, reactive, ref, watch} from "vue";
import DomHelper from "../../classes/DomHelper.js";
import {useStore} from "vuex";

export default {
    name: "ListBlock",
    mixins: [blockMixin],
    components: {
        contentEditable
    },
    props: {
        tag: {
            default: 'ul'
        }
    },
    setup(props) {
        const store = useStore('textEditor');
        const data = blockMixin.setup(props);
        const listElement = ref(null);
        const list = reactive(['']);
        const { value, keyDownHandler, onMouseupHandler } = data;

        data.setOutput(() => {
            let list = '';

           value.value.li.forEach(item => list += '<li>' + item.trim() + '</li>');

            return `<${value.value.tag}>${list}</${value.value.tag}>`;
        });

        watch(list, (newValue) => {
            value.value = {
                tag: props.tag,
                li: newValue,
            }
        })

        const addElement = (index, event) => {
            const keyCode = event.which;

            if (keyCode === 13) {
                event.preventDefault();
                if (list[list.length - 1] !== '') {
                    list.push('');
                    setTimeout(() => {
                        listElement.value.querySelector('li:last-child').focus();
                    });
                }
                else if (list.length > 1) {
                    if (index > 0) {
                        listElement.value.querySelector('li:nth-child('+index+')').focus();
                    }
                    list.splice(index, 1);
                    store.dispatch('addBlockByCode', 'text');
                }
            }
        }

        const handleBackspace = (index, event) => {
            const inputElement = event.target;
            const caretPos = DomHelper.getCaretPos(inputElement);

            if (event.key === 'Backspace' && list.length > 1 && (list[index] === '' || caretPos === 0)) {
                if (index > 0) {
                    listElement.value.querySelector('li:nth-child('+index+')').focus();
                }
                list.splice(index, 1);
            }
        }

        onMounted(() => {
            if (props.startValue) {
                props.startValue.forEach(item => {
                    if (list.length === 1 && list[0] === '') {
                        list[0] = item;
                    }
                    else {
                        list.push(item)
                    }
                });
            }

            listElement.value.querySelector('li:last-child').focus();
        })

        return {
            list,
            value,
            listElement,
            addElement,
            keyDownHandler,
            handleBackspace,
            onMouseupHandler,
        }
    }
}
</script>

<style scoped lang="sass">
ul,ol
    margin: 0
li
    outline: none
    font-size: 18px
    &:not(:last-child)
        margin-bottom: 15px
</style>
