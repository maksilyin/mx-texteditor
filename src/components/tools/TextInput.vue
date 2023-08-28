<template lang="pug">
.text-editor
    contentEditable(contenteditable="true" :tag="tag" v-model="text" ref="inputBlock" @keypress="pressHandler")
    p.text-editor__placeholder.placeholder(v-if="isPlaceholder") {{ placeholder }}

</template>

<script>
import contentEditable from 'vue-contenteditable';
import { ref, watch, onMounted } from "vue";

export default {
    name: "TextInput",
    components: {
        contentEditable
    },
    props: {
        tag: {
            type: String,
            default: 'p'
        },
        placeholder: {
            type: String,
            default: ''
        },
        focus: {
            default: true
        },
        pressHandler: {
            type: Function,
            default: () => {}
        },
        value: {
            type: String,
            required: true,
        }
    },

    setup(props, { emit }) {
        const isPlaceholder = ref(true);
        const inputBlock = ref(null);
        const text = ref(props.value);
        const inputHandler = () => {

        }

        watch(text, (newValue) => {

            if (newValue !== '') {
                isPlaceholder.value = false;
            }
            else {
                isPlaceholder.value = true;
            }
            emit('update:modelValue', newValue)
        });

        onMounted(() => {
            if (props.focus) {
                inputBlock.value.$el.focus();
            }
        });

        return {
            text,
            isPlaceholder,
            inputBlock,
            inputHandler
        }
    }
}

</script>

<style scoped lang="sass">
.text-editor
    position: relative
    &__placeholder
        position: absolute
        top: 0
        left: 0
        opacity: 0.5
        z-index: -1
    > *
        margin: 0
        outline: none

</style>
