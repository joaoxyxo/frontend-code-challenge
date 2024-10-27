import { mapGetters } from 'vuex';
import Loading from '@/views/Loading.vue';


export default {
    name: 'OrdersSingle',

    components: {
        Loading,
    },

    computed: {
        ...mapGetters({
            selectedOrder: 'orders/selectedOrder',
        }),

    },


    data() {
        return this.initialState();
    },

    created() {
        this.initialize();
    },

    methods: {
        initialState() {
            return {};
        },


        async initialize() {
            this.$store.dispatch('orders/getOrder', { id: this.$route.params.id });
        },

    }
}