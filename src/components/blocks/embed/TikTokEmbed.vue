<template lang="pug">

blockquote(class="tiktok-embed" :cite="src" :data-video-id="id" style="max-width: 605px;min-width: 325px;")
    section
component(:is="'script'" async src="https://www.tiktok.com/embed.js")

</template>

<script>
import {computed} from "vue";

export default {
    name: "TikTokEmbed",
    props: {
        src: {
            required: true,
        }
    },
    setup(props) {
        const id = computed(() => {
            const regex = /\/(\d+)(?:\?|$)/;

            const match = props.src.match(regex);

            if (match) {
                return match[1]
            }
            return false;
        });

        return {
            id
        }
    }
}
</script>
