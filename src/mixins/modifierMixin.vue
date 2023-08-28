<script>
import {useStore} from "vuex";

export default {
    name: "modifierMixin",
    setup() {
        const store = useStore('textEditor');

        const updateValue = () => {
            const element = store.state.selection.element;

            if (element) {
                element.dispatchEvent(new Event('input'));
            }
        }

        return {
            updateValue
        };
    },
};
</script>
