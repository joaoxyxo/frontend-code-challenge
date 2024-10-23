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
                    { name: 'Jogadores', icon: 'mdi-cards-variant', link: '/users' },
                    { name: 'Encomendas', icon: 'mdi-cards-outline', link: '/orders' },
                ]
            }
        },
    }
};