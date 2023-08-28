<template lang="pug">

label(:class="{disabled: isLoad}")
    input(type="file" accept="image/*" ref="inputFile" @change="handleFileUpload")
    <svg width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"/><path fill="#000000" d="M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"/></svg>

</template>

<script>
import {ref} from "vue";
import http from "../../classes/http";

export default {
    name: "ImageUploader",

    setup(_, { emit }) {
        const inputFile = ref(null);
        const isLoad = ref(false);

        const handleFileUpload = async (event) => {
            if (isLoad.value) {
                event.preventDefault();
                return;
            }
            const file = event.target.files[0];

            if (file && file.type.startsWith('image/')) {
                isLoad.value = true;
                try {
                    const result = await http.uploadImage(file);

                    if (result.data?.status === 'success') {
                        emit('upload', result.data.path);
                    }
                } catch (e) {
                    console.log(e.message)
                }
                isLoad.value = false;
            }

            resetFileInput();
        }

        const resetFileInput = () => {
            inputFile.value.value = null;
        }

        return {
            inputFile,
            isLoad,
            handleFileUpload
        }
    }
}
</script>

<style scoped lang="sass">

input
    display: none

label
    display: flex
    width: 100px
    height: 100px
    justify-content: center
    align-items: center
    cursor: pointer
    background-color: #E6EFFD
    border-radius: 10px
    transition: background-color .3s
    &:not(.disabled):hover
        background-color: #B3D1FF
    &.disabled
        cursor: default
        opacity: 0.4
</style>
