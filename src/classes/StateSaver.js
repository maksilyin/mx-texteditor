import BlockRegistry from "../classes/BlockRegistry.js";

class StateSaver {

    static save = (blocks) => {
        const data = [];

        blocks.forEach(block => {
            if (block.code === BlockRegistry.TYPES.LIST || block.code === BlockRegistry.TYPES.LIST_NUM) {
                data.push({
                    code: block.code,
                    value: block.value.li,
                });
            }
            else {
                data.push({
                    code: block.code,
                    value: block.value
                });
            }
        });

        localStorage.setItem('blocks', JSON.stringify(data));
    }

    static load = () => {
        let data = localStorage.getItem('blocks');

        if (data) {
            data = JSON.parse(data);
        }
        else {
            data = [];
        }

        return data;
    }

    static saveTitle = (value) => {
        localStorage.setItem('title', value);
    }

    static loadTitle = () => {
        const title = localStorage.getItem('title');

        if (title) {
            return title;
        }

        return null;
    }

    static clear = () => {
        localStorage.removeItem('title');
        localStorage.removeItem('blocks');
    }
}

export default StateSaver;
