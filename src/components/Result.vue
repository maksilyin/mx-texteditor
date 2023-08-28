<template lang="pug">
.result-container
    .result(v-html="store.getters.resultHtml")
</template>

<script>
import {useStore} from "vuex";

export default {
    name: "ResultHtml",

    setup() {
        const store = useStore('textEditor');

        return {
            store
        }
    }
}
</script>

<style scoped>

</style>
