class TextWrapper {
    constructor(tagName, range, parent) {
        this.tagName = tagName;
        this.range = range;
        this.parent = parent;
    }

    wrapSelectedText = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = this.range;
            let wrap = true;

            if (range.commonAncestorContainer.nodeType === Node.TEXT_NODE && range.commonAncestorContainer.parentNode.tagName.toLowerCase() === this.tagName) {
                wrap = false;
            }

            const extractedContents = range.extractContents();
            const textContent = this.clearTags(extractedContents);
//console.log(this.getSelectedElements(range))
            if (this.parent) {
               // this.parent.innerHTML = this.clearEmptyTags(this.parent.innerHTML);
            }

            const fr = this.getFragmentFromHtml(textContent);

            console.log(range)

            range.insertNode(fr);
            selection.removeAllRanges();
            selection.addRange(range);

            console.log(range.commonAncestorContainer.tagName.toLowerCase() + ' = ' + this.tagName);

            if (wrap) {
                range.surroundContents(document.createElement(this.tagName));
            }
        }
    };

    clearTags = (fragment) => {
        const regex = new RegExp(`<(${this.tagName})(\\s[^>]*?)?>|<\\/${this.tagName}\\s*>`, 'gi');
        return this.getHtmlString(fragment).replace(regex, '');
    }

    getHtmlString = (fragment) => {
        const tmp = document.createElement('div');
        tmp.appendChild(fragment);
        const result = tmp.innerHTML;
        tmp.remove();

        return result;
    }

    getFragmentFromHtml = (html) => {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content;
    }

    wrapText = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            if (node.nodeType === Node.TEXT_NODE && node.parentNode.tagName.toLowerCase() !== this.tagName) {
                const element = document.createElement(this.tagName);
                element.innerHTML = node.textContent;
                node.parentNode.insertBefore(element, node);
                node.parentNode.removeChild(node);
            }
            else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== this.tagName)  {
                this.wrapText(node.childNodes);
            }
        }
    }

    checkTagInNodes = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName.toLowerCase() !== this.tagName) {
                    return this.checkTagInNodes(node.childNodes);
                }
            }
        }

        return true;
    }

    checkTextInNodes = (nodes) => {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            console.log(node)
            if (node.nodeType === Node.TEXT_NODE && node.parentNode.tagName.toLowerCase() !== this.tagName) {
                return true;
            }
            else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== this.tagName)  {
                return this.checkTextInNodes(node.childNodes);
            }
        }

        return false;
    }

    getSelectedElements(range) {
        //const container = range.commonAncestorContainer;
        const selectedNodes = this.getNodesInRange(range);
        const selectedElements = [];

        for (const node of selectedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                selectedElements.push(node);
            } else if (node.nodeType === Node.TEXT_NODE) {
                const parentElement = node.parentElement;
                if (!selectedElements.includes(parentElement)) {
                    selectedElements.push(parentElement);
                }
            }
        }

        return selectedElements;
    }

    getNodesInRange(range) {
        const nodes = [];
        const iterator = document.createNodeIterator(
            range.commonAncestorContainer,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
        );

        let node;
        while ((node = iterator.nextNode())) {
            if (range.intersectsNode(node)) {
                nodes.push(node);
            }
        }

        return nodes;
    }
}



export default TextWrapper;
