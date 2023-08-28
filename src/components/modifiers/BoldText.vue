<template lang="pug">

button(@click="process" :class="{ active: isSelected }")
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.833 4.166c0-.46.373-.833.834-.833h3.75a3.75 3.75 0 0 1 2.954 6.06 3.751 3.751 0 0 1-1.288 7.273H6.667a.833.833 0 0 1-.834-.833V4.166zM7.5 10.833V15h4.583a2.083 2.083 0 0 0 0-4.167H7.5zm0-1.667h2.917a2.083 2.083 0 1 0 0-4.166H7.5v4.166z"></path>
    </svg>

</template>

<script>
import icon from "../../assets/icons/bold-icon.svg";
import {onMounted, ref} from "vue";
import modifierMixin from "../../mixins/modifierMixin.vue";
import {useStore} from "vuex";

export default {
    name: "BoldText",
    mixins: [modifierMixin],
    setup() {
        const store = useStore('textEditor');
        const isSelected = ref(false);
        const { updateValue } = modifierMixin.setup();
        const process = () => {
            document.execCommand('bold', false, null);
            store.dispatch('updateSelection');
            updateValue();
            checkForBold();
        }

        const checkForBold = () => {
            try {
                isSelected.value = !!store.getters.range.parentElement().closest('b');
            }
            catch (e) {
                isSelected.value = false;
            }
        };

        onMounted(() => {
            checkForBold();
        });

       return {
           icon,
           isSelected,
           checkForBold,
           process
       }
    }
}
</script>

<style scoped lang="sass">
.active
    svg
        fill: #4684D9
</style>
