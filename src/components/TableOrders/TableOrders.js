import { mapGetters } from 'vuex';
import EmptyStateNoData from '@/components/EmptyStateNoData/EmptyStateNoData.vue';
import DialogAddEditOrders from '@/components/DialogAddEditOrders/DialogAddEditOrders.vue';
import moment from 'moment';

export default {
  name: 'TableOrders',

  components: {
    EmptyStateNoData,
    DialogAddEditOrders,
  },

  data() {
    return this.initialState();
  },

  async created() {
    await this.initialize();
  },

  computed: {
    ...mapGetters({
        orders: 'orders/orders',
        ordersLoading: 'orders/ordersLoading',
    }),

  },

  methods: {
    initialState() {
      return {
        dataTable: {
          headers: [
            { text: 'ID', value: 'id', sortable: true },
            { text: 'orderDate', value: 'orderDate', sortable: true },
            { text: 'product', value: 'product', sortable: true },
            { text: 'Created at', value: 'createdAt', sortable: true },
            { text: 'Updated at', value: 'updatedAt', sortable: true },
            { text: 'Action', value: 'action', sortable: false },
          ],
          search: null,
        },
        options: {
          page: 1,
          itemsPerPage: 10,
          sortBy: ['id'],
          sortDesc: [false],
          groupBy: [],
          groupDesc: [],
          mustSort: true,
          multiSort: false
        },
        dialogues: {
          addEditOrder: false,
        },
        action: 'create',
      };
    },

    initialize() {
        this.fetchData();
    },

    async fetchData() {
      // API Call
      await this.$store.dispatch('orders/fetchOrders');
    },

    setActiveItem(item) {
      if (item)
        this.$store.commit('orders/setSelectedOrder', item);
    },


    editItem(item) {
      if (item) {
        this.$store.commit('orders/setSelectedOrder', item);
        this.dialogues.addEditOrder = true;
        this.action = 'update';
      }
    },

    addOrder() {
      this.action = 'create';
      this.dialogues.addEditOrder = true;
    },

    toggleDialog(dialog) {
      this.dialogues[dialog] = !this.dialogues[dialog];
    },

    getDateFormat(date) {
      return moment(date).format("DD-MM-YYYY HH:mm");
    }
  }
};
