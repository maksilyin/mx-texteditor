class DomHelper {
    static getCaretPos = (element) => {
        element.focus();
        if (document.selection) {
            const sel = document.selection.createRange();
            const clone = sel.duplicate();
            sel.collapse(true);
            clone.moveToElementText(element);
            clone.setEndPoint('EndToEnd', sel);
            return clone.text.length;
        } else {
            return window.getSelection().getRangeAt(0).startOffset;
        }
    }

    static getSelectionCoordinates = (range) => {
        const startContainer = range.startContainer;
        const startOffset = range.startOffset;

        const rangeRect = range.nativeRange.getBoundingClientRect();
        const startNode = document.createRange();
        startNode.setStart(startContainer, startOffset);
        const x = rangeRect.left;
        const y = rangeRect.top;

        return { x, y };
    };

    static checkImageClipboard = (clipboardData) => {
        const clipboardItems = clipboardData.items;

        const items = [].slice.call(clipboardItems).filter(function (item) {
            return item.type.indexOf('image') !== -1 && item.type.indexOf('image-uri') !== 0;
        });
        if (items.length === 0) {
            return;
        }

        const item = items[0];

        let blob = item.getAsFile();

        if (blob) {
            return blob;
        }

        return false;
    }

    static isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
    }
}

export default DomHelper;
