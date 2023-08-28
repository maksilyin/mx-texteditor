<template>
    <input placeholder="Hash" v-model="hashString"/>
    <component :is="'script'" @load="isLoad = true" src="https://vk.com/js/api/openapi.js?169"></component>
    <div v-if="hashString && hashString !== '' && isLoad">
        <div :id="'vk_post_' + postId.string"></div>
        <component :is="'script'">
            {{ vkScript() }}
        </component>
    </div>
</template>

<script>
import { computed, ref, watch } from "vue";

export default {
    name: "VkEmbed",
    props: {
        src: {
            required: true,
        },
        hash: {
            default: null
        }
    },
    setup(props, { emit }) {
        const hashString = ref(props.hash);
        const isLoad = ref(false);
        const postId = computed(() => {
            const result = {};

            const regex = /wall(-[0-9_]+)/;

            const match = props.src.match(regex);

            if (match) {
                const ids = match[1].split('_');
                result.string = match[1];
                result.owner = ids[0];
                result.post = ids[1];
            }
            return result;
        });

        const vkScript = (prefix = 'vk_post') => {
            return `
                (function() {
                    VK.Widgets.Post("${prefix}_${postId.value.string}", ${postId.value.owner}, ${postId.value.post}, '${hashString.value}');
                }());
            `
        };

        const output = computed(() => {

            const divElement = document.createElement("div");
            divElement.id = "vk_post-output_"+postId.value.string;

            const scriptElement1 = document.createElement("script");
            scriptElement1.type = "text/javascript";
            scriptElement1.src = "https://vk.com/js/api/openapi.js?169";

            const scriptElement2 = document.createElement("script");
            scriptElement2.type = "text/javascript";
            scriptElement2.innerHTML = `${vkScript('vk_post-output')}`;

            const divContainer = document.createElement("div");

            divContainer.appendChild(divElement);
            divContainer.appendChild(scriptElement1);
            divContainer.appendChild(scriptElement2);

            return divContainer.innerHTML;

        });

        watch (hashString, (newValue) => {
            emit('change', {
                props: {
                    hash: newValue
                },
                output: output.value,
            });
        });

        return {
            postId,
            vkScript,
            hashString,
            isLoad,
        }
    }
}
</script>

<style scoped lang="sass">

input
    width: 100%
    border-radius: 10px
    border: 2px solid #eaeaea
    padding: 10px 15px
    box-sizing: border-box
    margin: 10px 0
    font-size: 16px
</style>
