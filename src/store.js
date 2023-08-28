import { createStore } from 'vuex'
import BlockRegistry from "../src/classes/BlockRegistry.js";
import rangy from "rangy";
import DomHelper from "../src/classes/DomHelper.js";
import http from "../src/classes/http.js";

const store = createStore({
    state () {
        return {
            title: null,
            blocks: [],
            isSelect: false,
            elementSelectTextCoordinates: null,
            selection: {
                element: null,
                range: null,
                selection: null,
            },
            debug: null,
        }
    },
    getters: {
        getBlock: (state) => (id) => {
            return state.blocks.find(blockItem => blockItem.id === id);
        },
        resultHtml: (state) => {
            let out = '';

            if (state.title) {
                out = '<h1>'+state.title+'</h1>';
            }

            state.blocks.forEach(block => {
                out += block.output;
            });

            return out;
        },
        result: (state, getters) => {
            return {
                title: state.title,
                blocks: state.blocks,
                html: getters.resultHtml,
            }
        },
        selection: (state) => {
            return state.selection.selection;
        },
        range: (state) => {
            return state.selection.range;
        }
    },
    mutations: {
        updateBlock (state, [id, value, output]) {
            const block = state.blocks.find(blockItem => blockItem.id === id);

            if (block) {
                block.value = value;
                block.output = output;
            }
        },
        setBlock(state, params) {
            state.blocks.push({
                ...params
            });
        },
        setIsSelect(state, value) {
            state.isSelect = value;
        },
        setElementSelectTextCoordinates(state, value) {
            state.elementSelectTextCoordinates = value;
        },
        updateBlocks (state, value) {
            state.blocks = value;
        },
        setSelectedElement (state, value) {
           state.selectedElement = value;
        },
        setTitle (state, value) {
            state.title = value;
        },
        resetSelect(state) {
            state.elementSelectTextCoordinates = null;
            state.selection = {
                element: null,
                range: null,
                selection: null,
            }
        },
        setDebug (state, value) {
            state.debug = value;
        },
        resetBlocks (state) {
            state.blocks = [];
        }
    },
    actions: {
        addBlock: (context, params) => {
            const lastBlock = context.state.blocks[context.state.blocks.length-1];
            if (context.state.blocks.length > 0 && (lastBlock.code !== BlockRegistry.TYPES.IMAGE && lastBlock.value === "")) {
                return;
            }
            context.commit('setBlock', { value: '', output: '', ...params })
        },
        addBlockByCode: (context, code) => {
            const params = BlockRegistry.getParamsBlock(code);
            context.dispatch('addBlock', params);
            context.commit('setIsSelect', false);
        },
        deleteBlock: (context, id) => {
            const index = context.state.blocks.map(function (block) { return block.id; }).indexOf(id);
            context.state.blocks.splice(index, 1);
        },
        addArBlocks: async (context, { blockId, data, reset, clipboard }) => {

            if (reset === true) {
                context.commit('resetBlocks');
                context.commit('resetSelect');
            }

            if (blockId && context.getters.getBlock(blockId).value === '') {
                await context.dispatch('deleteBlock', blockId);
            }

            for (let i = 0; i < data.length; i++) {
                const block = data[i];
                const params = BlockRegistry.getParamsBlock(block.code);
                params.props = {
                    ...params.props
                }
                if (block.attr?.class) {
                    params.props.class = block.attr.class;
                }
                if (block.code === BlockRegistry.TYPES.IMAGE && block.value.upload) {
                    params.props.upload = block.value.upload;

                    if (clipboard === true) {
                        params.props.load = true;
                    }
                }
                else {
                    params.props.startValue = block.value;
                }

                await context.dispatch('addBlock', params);
                context.commit('setIsSelect', false);
            }
        },
        loadBlocks: (context, blocks = []) => {
            if (blocks.length) {
                context.dispatch('addArBlocks', { data: blocks })
            }
        },
        updateSelection(context, element) {
            const sel = rangy.getSelection();

            if (sel.rangeCount && sel.type === 'Range') {
                const range = sel.getRangeAt(0);
                context.commit('setElementSelectTextCoordinates', DomHelper.getSelectionCoordinates(range));
                context.state.selection = {
                    range: range,
                    selection: sel,
                }

                if (element) {
                    context.state.selection.element = element
                }
            }
            else {
                context.commit('resetSelect');
            }
        },
        async send(context) {
            const result = context.getters.result;
            const { data } = await http.sendResult(result);
        }
    }
})

export default store;
