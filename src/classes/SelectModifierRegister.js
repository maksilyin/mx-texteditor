import BoldText from "../components/modifiers/BoldText.vue";
import ItalicText from "../components/modifiers/ItalicText.vue";
import LinkText from "../components/modifiers/LinkText.vue";

class SelectModifierRegister {
    static list = [
        {
            name: 'Жирный',
            component: BoldText,
            code: 'bold'
        },
        {
            name: 'Курсив',
            component: ItalicText,
            code: 'italic'
        },
        {
            name: 'Ссылка',
            component: LinkText,
            code: 'link'
        }
    ]

    static set = (name, code, component) => {
        SelectModifierRegister.list.push({
            name, component, code,
        });
    }

    static get = (code) => {
        return SelectModifierRegister.list.find(item => item.code === code);
    }
}

export default SelectModifierRegister;
