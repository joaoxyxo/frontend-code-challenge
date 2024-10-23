import { mapGetters } from 'vuex';


export default {
    name: 'Home',

    components: {

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
                usersView: '/users',
                ordersView: '/orders',
            }
        },

        goToUsers() {
            if (this.$route.path !== '/users') {
              this.$router.push({ path: '/users' });
            }
          },
          goToOrders() {
            if (this.$route.path !== '/orders') {
              this.$router.push({ path: '/orders' });
            }
          }
    }
}
