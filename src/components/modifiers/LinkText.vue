<template lang="pug">

div
    button(@click="clickHandler" :class="{ active: isHasLink }")
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.286 3.705A4.243 4.243 0 0 1 13.283 2.5a4.244 4.244 0 0 1 2.976 1.257 4.298 4.298 0 0 1 1.244 2.99 4.298 4.298 0 0 1-1.192 3.011l-.01.01-2.055 2.071a4.233 4.233 0 0 1-5.057.732 4.266 4.266 0 0 1-1.367-1.195.833.833 0 0 1 1.338-.993 2.572 2.572 0 0 0 3.903.283l2.05-2.066c.469-.493.73-1.152.724-1.839a2.63 2.63 0 0 0-.761-1.83 2.578 2.578 0 0 0-1.807-.764 2.577 2.577 0 0 0-1.816.728L10.28 6.071A.833.833 0 0 1 9.1 4.894l1.178-1.18.008-.01zM7.277 7.17a4.233 4.233 0 0 1 3.534.255 4.266 4.266 0 0 1 1.367 1.195.833.833 0 0 1-1.338.993 2.571 2.571 0 0 0-3.903-.283l-2.049 2.066a2.632 2.632 0 0 0-.724 1.838c.005.689.28 1.346.76 1.83.481.485 1.13.759 1.808.765a2.577 2.577 0 0 0 1.815-.728l1.165-1.175a.833.833 0 0 1 1.184 1.174l-1.172 1.18-.01.01a4.243 4.243 0 0 1-2.997 1.206 4.244 4.244 0 0 1-2.976-1.257 4.298 4.298 0 0 1-1.244-2.99 4.299 4.299 0 0 1 1.193-3.011l.01-.01 2.054-2.071c.431-.435.95-.772 1.523-.987z"></path>
        </svg>
    input(v-if="isInput && !isMobile()" v-model="url" placeholder="Введите ссылку" @keyup.enter="handleEnterKey" ref="inputElement")

</template>

<script>
import icon from "../../assets/icons/link-icon.svg";
import modifierMixin from "../../mixins/modifierMixin.vue";
import { ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import DomHelper from "../../classes/DomHelper.js";

export default {
    name: "LinkText",
    mixins: [modifierMixin],

    setup(props) {
        const store = useStore('textEditor');
        const { updateValue } = modifierMixin.setup(props);
        const url = ref('');
        const isInput = ref(false);
        const inputElement = ref(null);
        const isHasLink = ref(false);
        const linkElement = ref(null);

        const checkForLink = () => {
            return store.getters.range.parentElement().closest('a');
        };

        const handleEnterKey = () => {
            const selection = store.getters.selection;
            selection.removeAllRanges();
            selection.addRange(store.state.selection.range);

            if (url.value !== '' && !linkElement.value) {
                document.execCommand('createLink', false, url.value);
                store.dispatch('updateSelection');
                updateValue();
                isHasLink.value = true
                if (selection.anchorNode.parentElement.tagName === 'A') {
                    linkElement.value = selection.anchorNode.parentElement
                }
                else {
                    linkElement.value = checkForLink();
                }
            }
            else if (url.value !== '' && linkElement.value) {
                linkElement.value.href = url.value;
                store.dispatch('updateSelection');
                updateValue();
            }
            else {
                if (linkElement.value) {
                    removeLink();
                }
            }
        }

        const isMobile = () => {
            return DomHelper.isMobile();
        }

        const clickHandler = () => {
            if (isMobile()) {

                const newUrl = prompt('Введите ссылку', url.value);

                if (newUrl) {
                    document.execCommand('createLink', false, newUrl);
                    url.value = newUrl;
                    store.dispatch('updateSelection');
                    updateValue();
                    const selection = store.getters.selection;
                    isHasLink.value = true

                    if (selection.anchorNode.parentElement.tagName === 'A') {
                        linkElement.value = selection.anchorNode.parentElement
                    } else {
                        linkElement.value = checkForLink();
                    }
                }
                else if (newUrl === '') {
                    removeLink();
                }
            }
            else if (!isInput.value) {
                isInput.value = true;

                setTimeout(() => {
                    inputElement.value.focus();
                });
            }
            else {
                if (linkElement.value) {
                    removeLink();
                }
            }
        }

        onBeforeMount(() => {
            const el = checkForLink();

            if (el) {
                linkElement.value = el;
                url.value = el.href;
                isInput.value = true;
                isHasLink.value = true;
            }

        });

        const removeLink = () => {
            document.execCommand('unlink', false, null);
            store.dispatch('updateSelection');
            isInput.value = false;
            url.value = '';
            isHasLink.value = false;
            linkElement.value = null;
        }

        return {
            icon,
            url,
            store,
            isInput,
            inputElement,
            clickHandler,
            handleEnterKey,
            checkForLink,
            isHasLink,
            removeLink,
            isMobile
        }
    }
}
</script>

<style scoped lang="sass">
div
    display: flex
input
    border-radius: 10px
    border: 2px solid #eaeaea
    padding: 5px 10px
    font-size: 16px
    box-sizing: border-box

.active
    svg
        fill: #4684D9

</style>
