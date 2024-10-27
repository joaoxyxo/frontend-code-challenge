import { mapGetters } from 'vuex';
import EmptyStateNoData from '@/components/EmptyStateNoData/EmptyStateNoData.vue';
import DialogAddEditUsers from '@/components/DialogAddEditUsers/DialogAddEditUsers.vue';
import moment from 'moment';

export default {
  name: 'TableUsers',

  components: {
    EmptyStateNoData,
    DialogAddEditUsers,
  },

  data() {
    return this.initialState();
  },

  async created() {
    await this.initialize();
  },

  computed: {
    ...mapGetters({
        users: 'users/users',
        usersLoading: 'users/usersLoading',
    }),

  },

  methods: {
    initialState() {
      return {
        dataTable: {
          headers: [
            { text: 'ID', value: 'id', sortable: true },
            { text: 'Name', value: 'fullName', sortable: true },
            { text: 'Email', value: 'email', sortable: true },
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
          addEditUser: false,
        },
        action: 'create',
      };
    },

    initialize() {
        this.fetchData();
    },

    async fetchData() {
      // API Call
      await this.$store.dispatch('users/fetchUsers');
    },

    setActiveItem(item) {
      if (item)
        this.$store.commit('railExpenses/setSelectedExpense', item);
    },


    editItem(item) {
      if (item) {
        this.$store.commit('users/setSelectedUser', item);
        this.dialogues.addEditUser = true;
        this.action = 'update';
      }
    },

    addUser() {
      this.action = 'create';
      this.dialogues.addEditUser = true;
    },

    toggleDialog(dialog) {
      this.dialogues[dialog] = !this.dialogues[dialog];
    },

    getDateFormat(date) {
      return moment(date).format("DD-MM-YYYY HH:mm");
    }
  }
};
