import { mapGetters } from 'vuex';
import TableOrders from '@/components/TableOrders/TableOrders.vue';


export default {
    name: 'Orders',

    components: {
        TableOrders,
    },

    computed: {
		...mapGetters({

		}),
    },

    mixins: [
        
    ],

    data() {
        return this.initialState();
    },

    created() {

    },

    methods: {
        initialState() {
            return {
   
            }
        },

    }
}
