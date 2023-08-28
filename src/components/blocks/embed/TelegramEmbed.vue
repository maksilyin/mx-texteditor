<template>
    <div class="editor-telegram" v-if="postId">
        <component :is="'script'" src="https://telegram.org/js/telegram-widget.js" :data-telegram-post="postId" data-width="100%"></component>
    </div>
</template>

<script>
import {computed, onMounted} from "vue";

export default {
    name: "TelegramEmbed",
    props: {
        src: {
            required: true,
        },
    },

    setup(props, {emit}) {
        const postId = computed(() => {

            const regex = /\/t.me\/(.+\/[0-9]+)/;

            const match = props.src.match(regex);

            if (match) {
                return match[1];
            }
            return '';
        });

        const output = computed(() => {
            const scriptElement = document.createElement("script");
            scriptElement.src = "https://telegram.org/js/telegram-widget.js";
            scriptElement.setAttribute("data-telegram-post", postId.value);
            scriptElement.setAttribute("data-width", "100%");


            const divContainer = document.createElement("div");

            divContainer.appendChild(scriptElement);

            return divContainer.innerHTML;
        });

        onMounted(() => {
            emit('change', {output: output.value})
        });

        return {
            postId
        }
    }
}
</script>

<style scoped lang="sass">
.editor-telegram
    margin: 10px 0
</style>
