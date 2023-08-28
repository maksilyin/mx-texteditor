<template lang="pug">
.editor(ref="emptyBlock" :style="{width: width, height: height}")
    .editor__blocks-wrapper(ref="editorBlocks")
        transition(name="fade")
            .editor__modifier(v-if="isSelectModifier" ref="modifierBlock" )
                SelectModifier
        transition(name="fade")
            .editor__select-block(v-if="isSelect" ref="selectBlock")
                BlockList
        .editor__blocks-list(ref="editorBlockList")
            Title(v-if="showH1")
            EditorBlockList
            .editor__empty
                input.editor__empty-text(placeholder="Нажмите Tab для выбора инструмента" @input="onInputEmpty" v-on:keydown="handleKeyDown")
                span.editor__empty-add-btn(:class="{open: isSelect}" @click="openSelectBlock" ref="closeBtn")
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 3.333c.46 0 .833.373.833.833v5h5a.833.833 0 1 1 0 1.667h-5v5a.833.833 0 0 1-1.666 0v-5h-5a.833.833 0 1 1 0-1.667h5v-5c0-.46.373-.833.833-.833z"/></svg>
    .editor__bottom(v-if="showSaveBtn")
        button.editor__send(@click="sendResult" :disabled="isSending") Опубликовать
Result(v-if="debug")
</template>

<script>
import Title from "../src/components/blocks/Title.vue";
import BlockList from '../src/components/BlockList.vue';
import SelectModifier from "../src/components/SelectModifier.vue";
import EditorBlockList from '../src/components/EditorBlockList.vue';
import Result from "../src/components/Result.vue";
import {computed, ref, onMounted, watch, onBeforeMount} from 'vue';
import { useStore } from 'vuex'
import DomHelper from "../src/classes/DomHelper.js";
import HTMLProcessor from "./classes/HTMLProcessor.js";
import EndpointsRegister from "./classes/EndpointsRegister.js";

export default {
    name: 'App',
    components: {
        Title,
        BlockList,
        EditorBlockList,
        SelectModifier,
        Result
    },
    props: {
        modelValue: String,
        data: {
            type: Object,
            default: {},
        },
        showH1: {
            default: false
        },
        showSaveBtn: {
            default: false
        },
        width: {
            default: '100%'
        },
        height: {
            default: '150px'
        },
        debug: {
            default: false
        },
        endpoints: {
            type: Object,
            default: null
        }
    },
    setup(props, { emit }) {
        const isInit = ref(false);
        const store = useStore('textEditor');
        const closeBtn = ref(null);
        const selectBlock = ref(null);
        const emptyBlock = ref(null);
        const editorBlocks = ref(null);
        const editorBlockList = ref(null);
        const modifierBlock = ref(null);
        const blocks = computed(() => {
            return store.state.blocks;
        });
        const isSelect = computed(() => {
            return store.state.isSelect;
        });
        const isSending = ref(false);

        const openSelectBlock = () => {
            const box = editorBlockList.value.getBoundingClientRect();
            store.commit('setIsSelect', !isSelect.value);

            if (isSelect.value) {
                setTimeout(() => {
                    const selectBlockHeight = selectBlock.value.getBoundingClientRect().height;
                    const editorBlocksHeight = editorBlocks.value.getBoundingClientRect().height;
                    let top =  box.height;

                    if (box.height + selectBlockHeight / 4 > editorBlocksHeight) {
                        top -= selectBlockHeight + 40;
                    }

                    selectBlock.value.style.top = top + 'px';
                });
            }
        }

        const handleKeyDown = (event) => {
            if (event.code === 'Tab' || event.key === 'Tab') {
                openSelectBlock();
            }
        }

        const onInputEmpty = (event) => {
            event.target.value = "";
            event.target.blur();

            store.dispatch('addBlockByCode', 'text');
        }

        const sendResult = async () => {
            isSending.value = true;
            try {
                await store.dispatch('send');
            }
            catch (e) {
                console.log(e.message);
            }
            isSending.value = false;
        }

        const isSelectModifier = computed(() => {
            return !!store.state.elementSelectTextCoordinates;
        });

        watch (isSelectModifier, (newValue) => {
            if (newValue) {
                const coordinates = store.state.elementSelectTextCoordinates;
                const box = editorBlocks.value.getBoundingClientRect();
                let top = coordinates.y - box.top + editorBlocks.value.scrollTop;
                let left = coordinates.x - box.left;

                setTimeout(() => {
                    const modifierBlockWidth = modifierBlock.value.getBoundingClientRect().width;

                    if (left + modifierBlockWidth > box.width) {
                        left -= (left + modifierBlockWidth - box.width + 15);
                    }

                    if (DomHelper.isMobile()) {
                        left = 10;
                    }

                    modifierBlock.value.style.top = top - 50 + 'px';
                    modifierBlock.value.style.left = left + 'px';
                });
            }
        });

        const resultHtml = computed(() => {
            return store.getters.resultHtml;
        })

        const initTextEditor = () => {
            isInit.value = true;
            const htmlProcessor = new HTMLProcessor(props.modelValue)
            const html = htmlProcessor.process();
            store.dispatch('addArBlocks', {data: html, reset: true});
        }

        watch(resultHtml, (newValue) => {
            emit('update:modelValue', newValue);
        });

        watch( () => props.modelValue, (newValue) => {
            if (!isInit.value) {
                initTextEditor();
            }
        })

        onBeforeMount(() => {
            if (props.endpoints) {
                EndpointsRegister.setEndpoints(props.endpoints);
            }
        });

        onMounted(() => {
            if (props.data.blocks) {
                store.dispatch('loadBlocks', props.data.blocks);
            }
            if (props.modelValue && props.modelValue !== '') {
                initTextEditor();
            }
        });

        return {
            store,
            blocks,
            isSelect,
            openSelectBlock,
            selectBlock,
            closeBtn,
            emptyBlock,
            handleKeyDown,
            onInputEmpty,
            isSelectModifier,
            editorBlocks,
            isSending,
            sendResult,
            editorBlockList,
            modifierBlock,
        }
    }
}
</script>
<style lang="sass">
@import 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'

.editor
    font-family: 'Roboto', sans-serif
    &-block__close-btn, &__empty-add-btn, &-block__moved-btn
        box-sizing: content-box
    ol, ul
        padding-left: 20px

.editor *
    outline: none

.editor-block-wrapper
    position: relative
    .placeholder
        position: absolute
        top: 0
        left: 0
        opacity: 0.5
        font-weight: bold
        outline: none
        font-size: 26px
        z-index: -1

.fade-enter-active,
.fade-leave-active
    transition: opacity 0.3s ease

.fade-enter-from,
.fade-leave-to
    opacity: 0

</style>
<style scoped lang="sass">

.editor
    position: relative
    margin: 0 auto
    display: flex
    flex-direction: column
    height: calc(100vh - 30px)
    &__blocks-wrapper
        flex-grow: 1
        overflow-y: auto
        padding: 0 30px
        position: relative
        scrollbar-width: thin
        scrollbar-color: hsl(0 0% 50%)
        &::-webkit-scrollbar
            width: 10px
        &::-webkit-scrollbar-track
            background: #e1e1e1
        &::-webkit-scrollbar-thumb
            background-color: #808080
            border-radius: 20px
            border: 3px solid #e1e1e1
    &__empty
        font-size: 20px
        font-weight: 600
        position: relative
        padding: 5px 10px
        &-add-btn
            position: absolute
            left: -30px
            top: 2px
            cursor: pointer
            transition: all .3s
            border-radius: 50%
            display: flex
            align-items: center
            justify-content: center
            padding: 5px
            width: 20px
            height: 20px
            opacity: 0.4
            &:hover
                opacity: 1
            &.open
                transform: rotate(45deg)
    &__empty-text
        opacity: 0.5
        border: 0
        font-size: 20px
        outline: none
        width: 100%
    &__select-block
        position: absolute
        left: 10px
        background-color: white
        box-shadow: 0 4px 20px rgba(0, 0, 0, .08), 0 0 1px rgba(0, 0, 0, .16)
        transition: all .3s
        z-index: 1
        &.open
            opacity: 1
            z-index: 1
    &__bottom
        display: flex
        flex-wrap: wrap
        gap: 15px
    &__send
        display: inline-flex
        align-items: center
        line-height: 1
        font-weight: 500
        justify-content: center
        cursor: pointer
        white-space: nowrap
        border: 0
        background-color: #307DF0
        padding: 13px 20px
        border-radius: 10px
        color: white
        font-size: 18px
        transition: all .3s
        &:hover
            background-color: #2D75E0
    &__bottom
        padding-top: 20px
    &__modifier
        position: absolute
        padding: 5px
        border-radius: 5px
        background-color: white
        z-index: 2
        box-shadow: 0 4px 20px rgba(0, 0, 0, .08), 0 0 1px rgba(0, 0, 0, .16)
.result-container
    max-width: 800px
    margin: 0 auto
</style>
