<template lang="pug">

.editor-embed(:class="{error: !isValid}")
    contentEditable(placeholder="Вставьте ссылку" tag="div" v-model="link.value" :pressHandler="keyDownHandler" ref="inputBlock")
div(v-if="isValid && link.value !== ''")
    embed(
        v-if="!currentDomain.component"
        :src="link.value"
        autostart="0"
        hspace="10"
        vspace="10"
        width="400"
        height="255"
    )
    component(v-else :is="currentDomain.component" :src="link.value" @change="onChangeHandler(currentDomain.name, $event)" v-bind="currentDomain.props")
</template>

<script>
import blockMixin from "../../mixins/blockMixin.vue";
import TextInput from "../../components/tools/TextInput.vue";
import contentEditable from '../../components/contenteditable.vue';
import TikTokEmbed from "../../components/blocks/embed/TikTokEmbed.vue";
import VkEmbed from "../../components/blocks/embed/VkEmbed.vue";
import TelegramEmbed from "../../components/blocks/embed/TelegramEmbed.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";

export default {
    name: "EmbedBlock",
    components: {
        TextInput,
        contentEditable,
        TikTokEmbed,
        VkEmbed,
        TelegramEmbed,
    },
    mixins: [blockMixin],

    setup(props) {
        const data = blockMixin.setup(props);
        const inputBlock = ref(null);
        const link = reactive({ value: '', domain: null, props: null });
        const isValid = ref(true);
        const { value, keyDownHandler } = data;
        const domainRegex = /^https?:\/\/(?:[^@/\n]+@)?(?:www\.)?([^:/\n]+)/im;

        const tikTokOutput = () => {
            return `<p class="tiktok-embed" align="center"><embed src="${value.value}" width="100%" height="750"></p>`;
        }

        const domains = [
            { name: 'youtube.com', component: false},
            { name: 'instagram.com', component: false},
            { name: 'tiktok.com', component: TikTokEmbed, output: tikTokOutput},
            { name: 'coub.com', component: false},
            { name: 'vk.com', component: VkEmbed, output: () => ''},
            { name: 't.me', component: TelegramEmbed},
        ]

        data.setOutput(() => {
            if (!isValid.value || value.value.value === '') {
                return '';
            }

            if (currentDomain.value.output) {
                return currentDomain.value.output();
            }

            return `<p><embed src="${value.value.value}" width="700" height="450"></p>`;
        });

        onMounted(() => {
            if (props.startValue) {
                Object.assign(link, props.startValue);

                if (props.startValue.domain && props.startValue.props) {
                    const domainData = domains.find(domain => domain.name === props.startValue.domain);
                    domainData.props = props.startValue.props;
                }
            }

            inputBlock.value.$el.focus();
        });

        watch(link, (newValue) => {
            let val = newValue.value;
            if (isAllowedDomain(val) || val === '') {

                if (/coub.com\/view\//.test(val)) {
                    val = val.replace('/view/', '/embed/');
                    link.value = val;
                }
                else if (currentDomain.value.name === 'tiktok.com') {
                    val = val.replace(/\/@.+\/video\//, '/embed/v2/');
                    link.value = val;
                }

                value.value = {
                    value: newValue.value,
                    props: newValue.props,
                    domain: newValue.domain,
                };
                isValid.value = true;
            }
            else {
                isValid.value = false;
            }
        });

        const allowedDomains = computed(() => {
            return domains.map(domain => domain.name)
        });

        const domain = (url) => {
            const match = url.match(domainRegex);

            if (match) {
                return match[1];
            }

            return false;
        }

        const currentDomain = computed(() => {
            const current = domain(link.value);
            return domains.find(domain => domain.name === current);
        })

        const isAllowedDomain = (url) => {
            return allowedDomains.value.includes(domain(url));
        }

        const onChangeHandler = (domain, payload) => {
            link.domain = domain;
            link.props = payload.props;

            console.log(payload);

            if (payload.output) {
                data.setOutput(() => {
                    return payload.output;
                });
            }
        }

        // eslint-disable-next-line no-unused-vars
        const isValidUrl = urlString => {
            const urlPattern = new RegExp('^(https?:\\/\\/)?'+
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ //
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
                '(\\?[;&a-z\\d%_.~+=-]*)?'+
                '(\\#[-a-z\\d_]*)?$','i');
            return !!urlPattern.test(urlString);
        }

        return {
            value,
            inputBlock,
            keyDownHandler,
            link,
            isValid,
            currentDomain,
            onChangeHandler,
        }
    }
}
</script>

<style lang="sass">
.editor-embed
    border-radius: 10px
    border: 2px solid #eaeaea
    padding: 10px 15px
    .text-editor > *
        font-size: 18px
    &.error
        border: 2px solid #f85f5f
</style>
