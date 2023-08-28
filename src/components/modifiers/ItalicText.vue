<template lang="pug">

button(@click="process" :class="{ active: isSelected }")
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.647 3.333h-2.48a.833.833 0 0 0 0 1.667h1.395L7.705 15H5.833a.833.833 0 0 0 0 1.667h5a.833.833 0 1 0 0-1.667H9.438l2.857-10h1.872a.833.833 0 0 0 0-1.667h-2.52z"></path>
    </svg>

</template>

<script>
import icon from "../../assets/icons/italic-icon.svg";
import {onMounted, ref} from "vue";
import modifierMixin from "../../mixins/modifierMixin.vue";
import {useStore} from "vuex";

export default {
    name: "ItalicText",
    mixins: [modifierMixin],
    setup() {
        const store = useStore('textEditor');
        const { updateValue } = modifierMixin.setup();
        const isSelected = ref(false);
        const process = () => {
            document.execCommand('italic', false, null);
            store.dispatch('updateSelection');
            updateValue();
            checkForItalic();
        }

        const checkForItalic = () => {
            try {
                isSelected.value = !!store.getters.range.parentElement().closest('i');
            }
            catch (e) {
                isSelected.value = false;
            }
        };

        onMounted(() => {
            checkForItalic();
        });

        return {
            icon,
            isSelected,
            process,
            checkForItalic
        }
    }
}
</script>

<style scoped lang="sass">
.active
    svg
        fill: #4684D9
</style>
