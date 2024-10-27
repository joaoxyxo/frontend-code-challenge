export default {
    name: 'EmptyStateNoData',

    props: {
        icon: { type: String, required: false, default: 'a' },
        title: { type: String, required: false, default: 'a' },
        message: { type: String, required: false, default: '' },
        classColor: { type: String, required: false, default: '' },
        classIcon: { type: String, required: false, default: '' },
    },

    data() {
      return {};
    },

    methods: {
    }
}