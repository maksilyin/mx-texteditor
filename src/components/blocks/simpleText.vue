<template lang="pug">

contentEditable(
    :contenteditable="editable"
    :no-select="false"
    tag="p" v-model="value"
    :no-html="false"
    :on-paste-handler="onPaste"
    ref="inputBlock"
    @keypress="keyDownHandler"
    disabled
)

</template>

<script>
import contentEditable from '../../components/contenteditable.vue';
import {defineComponent, onMounted, ref } from "vue";
import HTMLProcessor from "../../classes/HTMLProcessor.js";
import blockMixin from "../../mixins/blockMixin.vue";
import {useStore} from "vuex";
import DomHelper from "../../classes/DomHelper.js";
import http from "../../classes/http.js";
import BlockRegistry from "../../classes/BlockRegistry.js";

export default defineComponent({
    name: "simpleText",
    mixins: [blockMixin],
    components: {
        contentEditable
    },
    setup(props) {
        const store = useStore('textEditor');
        const data = blockMixin.setup(props);
        const inputBlock = ref(null)
        const { value, keyDownHandler } = data;
        const editable = ref(true)

        data.setOutput(() => {
            let classStr = '';

            if (props.class) {
                classStr = ' class="'+props.class+'"'
            }
            return `<p${classStr}>${ value.value }</p>`;
        });

        const onPaste = async (event) => {
            const clipboardData = event.clipboardData || window.clipboardData;
            const clipboardImage = DomHelper.checkImageClipboard(clipboardData);

            if (clipboardImage) {
                editable.value = false;
                try {
                    const {data} = await http.uploadImage(clipboardImage);

                    if (data?.status === 'success') {

                        const params = BlockRegistry.getParamsBlock('image');
                        params.value = {
                            images: [
                                { path: data.path }
                            ]
                        }
                        params.props = {
                            startValue: params.value,
                        }

                        if (value.value === '') {
                            await store.dispatch('deleteBlock', props.blockId);
                        }

                        await store.dispatch('addBlock', params);
                        await store.dispatch('addBlockByCode', 'text');
                    }
                }
                    // eslint-disable-next-line no-empty
                catch (e) {}
                editable.value = true;
            }
            else {
                let pastedHTML = clipboardData.getData('text/html');

                if (pastedHTML === '') {
                    pastedHTML = clipboardData.getData('text/plain');
                }

                store.commit('setDebug', pastedHTML);

                if (pastedHTML !== '') {
                    event.preventDefault();
                    const htmlProcessor = new HTMLProcessor(pastedHTML)
                    const clipboardResult = htmlProcessor.process();
                    store.dispatch('addArBlocks', {blockId: props.blockId, data: clipboardResult, clipboard: true });
                }
            }
        }

        onMounted(() => {
            inputBlock.value.$el.focus();

            if (props.startValue) {
                value.value = props.startValue;
            }
        })

        return {
            value,
            inputBlock,
            editable,
            keyDownHandler,
            onPaste,
        }
    }
});
</script>

<style scoped lang="sass">
p
    margin: 0
    outline: none
    font-size: 18px
</style>
