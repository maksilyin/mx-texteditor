<template lang="pug">

.block-list
    .block-list__search
    .block-list__items
        .block-list__item(:class="{selected: blockList[selected].code === block.code}" v-for="block in blockList" :key="block.code" @click="onSelectBlock(block.code)")
            .block-list__icon
                img(:src="block.icon")
            .block-list__name {{ block.name }}

</template>

<script>
import BlockRegistry from "../classes/BlockRegistry.js";
import {useStore} from "vuex";
import {onMounted, ref, onUnmounted} from "vue";

export default {
    name: "BlockList",
    setup() {
        const store = useStore('textEditor');
        const blockList = BlockRegistry.blockList;
        const selected = ref(0);

        const onSelectBlock = (code) => {
            store.dispatch('addBlockByCode', code);
        }

        onMounted(() => {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("keyup", handleKeyUp);
            document.addEventListener("keydown", handleEnterKeyPress);
        });

        onUnmounted(() => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
            document.removeEventListener("keydown", handleEnterKeyPress);
        });

        const selectNextIndex = () => {
            if (blockList.length - 1 === selected.value) {
                selected.value = 0;
                return;
            }
            selected.value++;
        }

        const selectPrevIndex = () => {
            if (selected.value === 0) {
                selected.value = blockList.length - 1;
                return;
            }
            selected.value--;
        }

        function handleKeyDown(event) {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                event.stopPropagation();
                selectNextIndex();
                return false;
            }
        }

        function handleKeyUp(event) {
            if (event.key === "ArrowUp") {
                event.preventDefault();
                event.stopPropagation();
                window.scrollBy(0, 0);
                selectPrevIndex();
                return false;
            }
        }

        function handleEnterKeyPress(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                onSelectBlock(blockList[selected.value].code);
            }
        }

        return {
            blockList,
            onSelectBlock,
            selected,
        }
    }
}

</script>

<style scoped lang="sass">

.block-list
    width: auto
    max-height: 320px
    padding: 5px
    overflow: auto
    &__item
        display: flex
        transition: all .3s
        cursor: pointer
        align-items: center
        gap: 5px
        border-radius: 5px
        padding: 10px 5px
        &:hover, &.selected
            background: #E6EFFD
    &__icon
        width: 20px
        height: 20px
        img
            width: 100%
            height: 100%
            object-fit: contain
            object-position: center
    &__name
        font-size: 16px
        font-weight: 400

</style>
