<template lang="pug">
.editor-modifier__list
    .editor-modifier__item(v-for="item in list" :key="item.code")
        component(:is="item.component")
</template>

<script>
import SelectModifierRegister from "../classes/SelectModifierRegister.js";
import BoldText from "../components/modifiers/BoldText.vue";
import ItalicText from "../components/modifiers/ItalicText.vue";
import LinkText from "../components/modifiers/LinkText.vue";

export default {
    name: "SelectModifier",
    components: {
        BoldText,
        ItalicText,
        LinkText,
    },

    setup() {
        const list = SelectModifierRegister.list;

        return {
            list
        }
    }
}
</script>

<style lang="sass">
.editor-modifier
    &__list
        display: flex
        gap: 5px
        button
            background-color: white
            border-radius: 5px
            width: 32px
            height: 32px
            border: 0
            cursor: pointer
            transition: all .3s
            &:hover
                background-color: #E6EFFD
</style>
