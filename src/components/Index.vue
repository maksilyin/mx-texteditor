<template>
    <App v-model="model"/>
    <div v-html="model"></div>
</template>

<script>
import App from "../App.vue"
import {ref} from "vue";
export default {
    name: "Index",
    components: {
        App
    },
    setup() {
        const model = ref('<p>jgjghjghj<a href="http://yandex.ru/">ghjghj</a></p><p>czxcxzczxc</p><p>jgjgh<a href="http://jhjgjg.ru"><b>jghjghjghj</b></a> </p>');

        return {
            model
        }
    }
}
</script>

<style scoped>

</style>
