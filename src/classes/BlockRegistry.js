import simpleText from "../components/blocks/simpleText.vue";
import SubTitle from "../components/blocks/SubTitle.vue";
import Quote from "../components/blocks/Quote.vue";
import List from "../components/blocks/List.vue";
import Image from "../components/blocks/Image.vue";
import Embed from "../components/blocks/Embed.vue";

import textIcon from "../assets/icons/text-icon.svg"
import hIcon from "../assets/icons/h-icon.svg"
import quoteIcon from "../assets/icons/quote-icon.svg"
import listIcon from "../assets/icons/list-icon.svg"
import imageIcon from "../assets/icons/img-icon.svg"
import EmbedIcon from "../assets/icons/embed-icon.svg"

class BlockRegistry {
    static TYPES = {
        TEXT: 'text',
        SUBTITLE: 'subtitle',
        QUOTE: 'quote',
        LIST: 'list',
        LIST_NUM: 'list-num',
        IMAGE: 'image',
        EMBED: 'embed',
    }

    static blockList = [
        {
            name: 'Текст',
            code: this.TYPES.TEXT,
            icon: textIcon,
            component: simpleText,
        },
        {
            name: 'Заголовок',
            code: this.TYPES.SUBTITLE,
            icon: hIcon,
            component: SubTitle,
        },
        {
            name: 'Цитата',
            code: this.TYPES.QUOTE,
            icon: quoteIcon,
            component: Quote,
        },
        {
            name: 'Список',
            code: this.TYPES.LIST,
            icon: listIcon,
            component: List,
            props: {
                tag: 'ul'
            }
        },
        {
            name: 'Нумерованный список',
            code: this.TYPES.LIST_NUM,
            icon: listIcon,
            component: List,
            props: {
                tag: 'ol'
            }
        },
        {
            name: 'Изображение',
            code: this.TYPES.IMAGE,
            icon: imageIcon,
            component: Image,
        },
        {
            name: 'Embed ссылка',
            code: this.TYPES.EMBED,
            icon: EmbedIcon,
            component: Embed,
        },
    ];

    static set = (name, code, component, icon) => {
        BlockRegistry.blockList.push({
            name, code, component, icon
        });
    }

    static get = (code) => {
        return BlockRegistry.blockList.find(block => block.code === code);
    }

    static getParamsBlock = (code) => {
        const block = BlockRegistry.get(code);

        return {
            id: BlockRegistry.uid(),
            component: block.component,
            code: code,
            props: block.props,
        }
    }

    static uid = () => {
        return (new Date()).getTime();
    }
}

export default BlockRegistry;
