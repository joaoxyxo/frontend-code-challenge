import { mapGetters } from 'vuex';
import Loading from '@/views/Loading.vue';


export default {
    name: 'UsersSingle',

    components: {
        Loading,
    },

    computed: {
        ...mapGetters({
            selectedUser: 'users/selectedUser',
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
            this.$store.dispatch('users/getUser', { id: this.$route.params.id });
        },

    }
}