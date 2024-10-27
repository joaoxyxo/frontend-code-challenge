export default {
    name: 'Sidebar',

    data() {
        return this.initialState();
    },

    methods: {
        initialState() {
            return {
                routes: [
                    { name: 'Home', icon: 'mdi-bank-outline', link: '/' },
                    { name: 'Jogadores', icon: 'mdi-account', link: '/users' },
                    { name: 'Encomendas', icon: 'mdi-archive', link: '/orders' },
                ]
            }
        },
    }
};