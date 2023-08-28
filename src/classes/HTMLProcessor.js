import BlockRegistry from "../classes/BlockRegistry.js";

class HTMLProcessor {
    arHtmlFragments = [];
    inlineNodes = [];

    constructor(html) {
        this.html = html;
    }

    process() {
        const doc = this.getDoc(this.html);

        Array.from(doc.body.childNodes).forEach(node => {
            this.processNode(node);
        });

        if (this.inlineNodes.length) {
            this.setInlineFragment();
        }

        if (this.arHtmlFragments.length) {
            this.arHtmlFragments.forEach(item => {
                if (!item.clear) {
                    item.value = this.clearText(item.value);
                }
            });
        }

        return this.arHtmlFragments.filter(item => item.value !== '');
    }

    getDoc(html) {
        const parser = new DOMParser();
        return parser.parseFromString(html, 'text/html');
    }

    processNode(node, inline = true) {
        if ((node.nodeType === Node.TEXT_NODE || !node.tagName || this.isInline(node.tagName.toLowerCase())) && !inline) {
            return;
        }
        this.processInline(node);

        if (node.nodeType === Node.ELEMENT_NODE) {

            const tagName = node.tagName.toLowerCase();

            if (tagName === 'div') {
                return this.processDiv(node);
            }

            else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
                this.setFragment(BlockRegistry.TYPES.SUBTITLE, node.textContent.trim(), true, node.attributes);
            }

            else if (tagName === 'img') {
                const oData = this.processImage(node);
                this.setFragment(BlockRegistry.TYPES.IMAGE, { upload: oData }, true, node.attributes);
            }

            else if (['p'].includes(tagName)) {
                this.setFragment(BlockRegistry.TYPES.TEXT, node.innerHTML, false, node.attributes);
            }

            else if (['ul', 'ol'].includes(tagName)) {
                const arList = this.processList(node);
                let blockName = BlockRegistry.TYPES.LIST_NUM;

                if (tagName === 'ul') {
                    blockName = BlockRegistry.TYPES.LIST;
                }

                this.setFragment(blockName, arList, true, node.attributes);
            }

            else if (['iframe', 'embed'].includes(tagName)) {
                this.setFragment(BlockRegistry.TYPES.EMBED, node.src, node.attributes);
            }

            else {
                this.setFragment(BlockRegistry.TYPES.TEXT, node.innerHTML, false, node.attributes);
            }

            if (!this.isInline(node.tagName.toLowerCase()) && !['ul', 'ol'].includes(tagName)) {
                node.childNodes.forEach(childNode => {
                    this.processNode(childNode, false);
                })
            }
        }

        return null;
    }

    isInline(tagName) {
        const inline = ['a', 'span', 'b', 'i', 'em', 'strong', 'noindex', 'mark', 'abbr', 'del', 'ins', 'sup', 'sub', 'var', 'samp', 'kbd', 'code'];
        return inline.includes(tagName);
    }

    setFragment(code, value, clear = false, attrs = {}) {
        const attr = {};
        const allowAttrs = ['class'];

        for (let key in attrs) {
            if (attrs[key].value && attrs[key].value !== undefined && allowAttrs.includes(attrs[key].name)) {
                attr[attrs[key].name] = attrs[key].value;
            }
        }

        this.arHtmlFragments.push({
            code, value, clear, attr
        })
    }

    getInlineString(tagName, node) {
        if (tagName && node.textContent.trim() !== '') {
            const element = document.createElement(tagName);

            node.classList.forEach(className => {
                element.classList.add(className)
            })

            element.innerHTML = node.innerHTML;

            if (tagName === 'a') {
                element.href = node.href;
            }

            return element.outerHTML
        }
        else {
            return node.textContent;
        }
    }

    setInlineFragment() {
        let out = '';
        this.inlineNodes.forEach(item => {
            if (item !== '') {
                out += item + ' ';
            }
        });

        if (out !== '') {
            this.setFragment(BlockRegistry.TYPES.TEXT, out, true);
        }
        this.inlineNodes = [];
    }

    processInline(node) {
        let str = '';

        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.trim() !== '') {
                this.inlineNodes.push(node.textContent);
            }
        }
        else if (node.nodeType === Node.ELEMENT_NODE && this.isInline(node.tagName.toLowerCase())) {
            str = this.getContentInline(node);

            if (str.trim() !== '') {
                this.inlineNodes.push(str);
            }
        }
        else if (this.inlineNodes) {
            this.setInlineFragment();
        }
    }

    getContentInline(node) {
        let str = '';
        const tagName = node.tagName.toLowerCase();

        if (['b', 'i', 'a'].includes(tagName)) {
            str = this.getInlineString(tagName, node);
        } else if (tagName === 'em') {
            str = this.getInlineString('i', node);
        } else if (tagName === 'strong') {
            str = this.getInlineString('b', node);
        } else {
            str = this.getInlineString(tagName, node);
        }

        return str;
    }

    getClearText(node) {
        let str = '';

        if (node.nodeType === Node.TEXT_NODE) {
            str = node.textContent;
        }
        else if (node.nodeType === Node.ELEMENT_NODE) {
            str = this.getContentInline(node);
        }

        return str;
    }

    processDiv(divNode) {
        const paragraph = document.createElement('p');

        Array.from(divNode.childNodes).forEach(node => {
            const processedNode = this.processNode(node);
            if (processedNode) {
                paragraph.appendChild(processedNode);
            }
        });

        return paragraph;
    }

    processList(node) {
        const listNodes = node.childNodes;
        const result = [];

        listNodes.forEach(itemNode => {
            if (itemNode.nodeType === Node.ELEMENT_NODE) {
                const tagName = itemNode.tagName.toLowerCase();

                if (tagName === 'li') {
                    result.push(this.clearText(itemNode.innerHTML));
                }
            }
        });

        return result;
    }

    processImage(node) {
        return [node.getAttribute('src')]
    }

    clearText(text) {
        let newText = '';
        const doc = this.getDoc(text);

        Array.from(doc.body.childNodes).forEach(node => {
            newText += this.getClearText(node);
        });

        return newText;
    }
}

export default HTMLProcessor;
