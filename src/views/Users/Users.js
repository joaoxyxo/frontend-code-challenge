import users from '@/store/users';
import { mapGetters } from 'vuex';
import TableUsers from '@/components/TableUsers/TableUsers.vue';

export default {
    name: 'Users',

    components: {
        TableUsers,
    },

    computed: {
		...mapGetters({
            users: "users/users",
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

        retrieveUsers() {
            this.$store.dispatch("users/fetchUsers")
        }
    }
}