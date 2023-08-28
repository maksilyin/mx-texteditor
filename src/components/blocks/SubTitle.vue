<template lang="pug">
.editor-block-wrapper
    contentEditable(contenteditable="true" tag="h2" v-model="value" ref="inputBlock" @keypress="keyDownHandler")
    .placeholder(v-if="isPlaceholder") Заголовок

</template>

<script>
import blockMixin from "../../mixins/blockMixin.vue";
import contentEditable from '../../components/contenteditable.vue';
import TextInput from "../../components/tools/TextInput.vue";
import {onMounted, ref, computed} from "vue";

export default {
    name: "SubTitle",
    mixins: [blockMixin],
    components: {
        contentEditable,
        TextInput
    },

    setup(props) {
        const data = blockMixin.setup(props);
        const inputBlock = ref(null);
        const { value, keyDownHandler } = data;

        const isPlaceholder = computed(() => {
            return value.value === ''
        });

        data.setOutput(() => {
            let classStr = '';

            if (props.class) {
                classStr = ' class="'+props.class+'"'
            }
            return `<h2${classStr}>${ value.value }</h2>`;
        });

        onMounted(() => {
            inputBlock.value.$el.focus();

            if (props.startValue) {
                value.value = props.startValue;
            }
        })

        return {
            value,
            inputBlock,
            isPlaceholder,
            keyDownHandler
        }
    }
}
</script>

<style scoped lang="sass">
h2
    margin: 0
    outline: none
    font-size: 26px
</style>
