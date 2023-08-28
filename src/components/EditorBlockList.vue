<template lang="pug">
.editor-block(v-for="block in blocks" :key="block.id" :draggable="isDraggable" @dragstart="onDragStart($event, block.id)" @dragover="onDragOver($event, block.id)" @dragleave="onDragLeave" @drop="onDrop($event, block.id)" :class="{ 'drag-over': block.id === draggedOverBlockId }")
    component(:is="block.component" :block-id="block.id" v-bind="block.props")
    span(class="editor-block__moved-btn" @click="onMove(block.id)" @mouseover="onHoverChange(true)" @mouseleave="onHoverChange(false)")
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path d="M4.44 1.44a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm0 5.5a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm0 5.5a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm5-11a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm0 5.5a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Zm0 5.5a1.5 1.5 0 1 1 2.12 2.12 1.5 1.5 0 0 1-2.12-2.12Z"/>
        </svg>
    span(class="editor-block__close-btn" @click="onCloseBlock(block.id)")
        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Menu / Close_SM"><path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
        </svg>
</template>


<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
    name: "EditorBlockList",

    setup() {
        const store = useStore('textEditor');
        const draggedBlockId = ref(null);
        const draggedOverBlockId = ref(null);
        const isDraggable = ref(false);
        const blocks = computed({
            get() {
                return store.state.blocks;
            },
            set(value) {
                store.commit("updateBlocks", value);
            },
        });

        const onCloseBlock = (blockId) => {
            store.dispatch("deleteBlock", blockId);
        };

        const onDragStart = (event, blockId) => {
            draggedBlockId.value = blockId;
            event.dataTransfer.setData("text/plain", blockId);
        };

        const onDragOver = (event, blockId) => {
            event.preventDefault();
            draggedOverBlockId.value = blockId;
        };

        const onDragLeave = () => {
            draggedOverBlockId.value = null;
        };

        const onDrop = (event, targetBlockId) => {
            const sourceBlockId = parseInt(event.dataTransfer.getData("text/plain"));

            if (sourceBlockId && targetBlockId !== sourceBlockId) {
                const updatedBlocks = [...blocks.value];
                const sourceBlockIndex = getIndex(sourceBlockId);
                const targetBlockIndex = getIndex(targetBlockId);
                const element = updatedBlocks.splice(sourceBlockIndex, 1)[0];
                updatedBlocks.splice(targetBlockIndex, 0, element);

                blocks.value = updatedBlocks;
            }

            draggedBlockId.value = null;
            draggedOverBlockId.value = null;
        };

        const onMove = (blockId) => {
            if (draggedBlockId.value && draggedBlockId.value !== blockId) {
                const updatedBlocks = [...blocks.value];
                const sourceBlockIndex = updatedBlocks.findIndex((block) => block.id === draggedBlockId.value);
                const targetBlockIndex = updatedBlocks.findIndex((block) => block.id === blockId);
                const element = updatedBlocks.splice(sourceBlockIndex, 1)[0];
                updatedBlocks.splice(targetBlockIndex, 0, element);

                blocks.value = updatedBlocks;

                draggedBlockId.value = null;
            }
        };

        const onHoverChange = (isHovered) => {
            if (isHovered) {
                isDraggable.value = true;
            }
            else {
                isDraggable.value = false;
            }
        }

        const getIndex = (id) => {
            return blocks.value.map((block) => block.id).indexOf(id)
        }

        return {
            blocks,
            onCloseBlock,
            onDragStart,
            onDragOver,
            onDrop,
            onMove,
            onDragLeave,
            onHoverChange,
            draggedOverBlockId,
            isDraggable,
        };
    },
};
</script>

<style scoped lang="sass">
.editor-block
    position: relative
    padding: 5px 10px
    margin-bottom: 10px

    &.drag-over
        background-color: #e6effd

    &__moved-btn
        position: absolute
        left: -30px
        top: 0
        cursor: pointer
        transition: background-color 0.3s
        border-radius: 5px
        display: flex
        align-items: center
        justify-content: center
        padding: 5px
        width: 20px
        height: 20px

        &:hover
            background-color: #e6effd

    &__close-btn
        position: absolute
        right: -30px
        top: 0
        cursor: pointer
        transition: all 0.3s
        border-radius: 50%
        display: flex
        align-items: center
        justify-content: center
        padding: 5px
        width: 20px
        height: 20px
        opacity: 0

        &:hover
            background-color: #f0f0f0

    &__drop-line
        position: absolute
        left: 0
        right: 0
        bottom: 0px
        height: 1px
        background-color: #a7c9ff
    &:hover
        .editor-block__close-btn
            opacity: 1
</style>
