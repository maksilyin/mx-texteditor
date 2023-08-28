<template lang="pug">

.editor-images
    .editor-images__item(v-for="(file, index) in files" :key="index")
        .editor-images__item--img
            img(:src="file.path")
        span.editor-images__close(@click="deleteFile(index)")
            <svg data-v-17ff85c0="" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g data-v-17ff85c0="" id="Menu / Close_SM"><path data-v-17ff85c0="" id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
    imageUploader(@upload="handleUpload" v-if="isShowUploader")

</template>

<script>
import blockMixin from "../../mixins/blockMixin.vue";
import imageUploader from "../../components/tools/ImageUploader.vue";
import {computed, onMounted, reactive, watch} from "vue";
import http from "../../classes/http.js";

export default {
    name: "ImageBlock",
    components: {
        imageUploader
    },
    mixins: [blockMixin],
    props: {
        multiple: {
            default: false,
        },
        upload: {
            default: null,
        },
        load: {
            default: false
        }
    },

    setup(props) {
        const data = blockMixin.setup(props);
        const files = reactive([])
        const { value, keyDownHandler } = data;

        const isShowUploader = computed(() => {

            if (!props.multiple && files.length) {
                return false
            }

            return true;
        });

        const handleUpload = (path) => {
            files.push({
                path: path
            })
        }

        const deleteFile = (index) => {
            files.splice(index, 1);
        }

        watch(files, (newValue) => {
            value.value = {
                images: newValue
            };
        });

        data.setOutput(() => {
            let out = '';
            let classStr = '';

            if (props.class) {
                classStr = ' class="'+props.class+'"'
            }
            value.value.images.forEach(item => {
                out += `<img${classStr} style="max-width: 100%" src="${ item.path }">`;
            });

            return `<p>${ out }</p>`;
        });

        onMounted(() => {
            if (props.upload) {
                props.upload.forEach(path => {
                    if (/^(?:https?:\/\/)/i.test(path) && props.load) {
                        http.uploadImageByPath(path).then(response => {
                            if (response.data?.status === 'success') {
                                files.push({path: response.data.path});
                            }
                        });
                    }
                    else {
                        files.push({path: path});
                    }
                })
            }
            else if (props.startValue?.images) {
                props.startValue.images.forEach(image => {
                    files.push(image);
                });
            }
        })

        return {
            files,
            isShowUploader,
            handleUpload,
            keyDownHandler,
            deleteFile,
        }
    }
}
</script>

<style scoped lang="sass">

.editor-images
    display: flex
    gap: 15px
    flex-wrap: wrap
    &__item
        width: 100px
        height: 100px
        position: relative
        &--img
            width: 100%
            height: 100%
            border-radius: 10px
            overflow: hidden
            img
                width: 100%
                height: 100%
                object-fit: cover
    &__close
        position: absolute
        top: -10px
        right: -10px
        cursor: pointer
        border-radius: 50%
        background-color: white
        width: 20px
        height: 20px
        display: flex
        align-items: center
        justify-content: center
        border: 1px solid #a7a7a7
        transition: background-color .3s
        svg
            stroke: #F0303D
            transition: background-color .3s
        &:hover
            background-color: #F0303D
            svg
                stroke: white

</style>
