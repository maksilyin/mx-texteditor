<template lang="pug">
.editor-block-wrapper
    contentEditable(contenteditable="true" tag="h1" v-model="value" ref="inputBlock")
    .placeholder(v-if="isPlaceholder") Заголовок

</template>

<script>
import blockMixin from "../../mixins/blockMixin.vue";
import contentEditable from '../../components/contenteditable.vue';
import TextInput from "../../components/tools/TextInput.vue";
import { ref, onMounted, computed, watch } from "vue";
import {useStore} from "vuex";
import StateSaver from "../../classes/StateSaver.js";

export default {
    name: "TitleBlock",
    mixins: [blockMixin],
    components: {
        contentEditable,
        TextInput
    },

    setup() {
        const store = useStore('textEditor');
        const inputBlock = ref(null);
        const value = ref('');

        const isPlaceholder = computed(() => {
            return value.value === ''
        });

        watch(value, (newValue) => {
            store.commit('setTitle', newValue);
        });

        onMounted(() => {
            const title = StateSaver.loadTitle();

            if (title) {
                value.value = StateSaver.loadTitle();
            }
        });

        return {
            value,
            inputBlock,
            isPlaceholder,
        }
    }
}
</script>

<style scoped lang="sass">
h1
    margin: 0 0 20px
    outline: none
    font-size: 36px
.editor-block-wrapper
    .placeholder
        font-size: 36px
</style>
