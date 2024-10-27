import DatePicker from '@/components/DatePicker/DatePicker.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'DialogAddEditOrders',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
    action: {
      type: String,
      required: true,
      default: 'create',
      validator: function (value) {
        const allowedActions = ['create', 'update']
        return allowedActions.includes(value);
      },
    },
  },

  computed: {
    ...mapGetters({
      error: 'orders/error',
      selectedOrder: 'orders/selectedOrder',
      users: 'users/users',
    }),
  },

  components: {
    DatePicker
  },

  data() {
    return {
      title: '',
      submitting: false,
      form: {
        userId: null,
        orderDate: null,
        product: null,
      },
      rules: {
        userId: [
          (v) => !!v || 'O nome do jogador é obrigatório',
        ],
        orderDate: [
          (v) => !!v || 'Data é obrigatória',
        ],
        product: [
          (v) => !!v || 'O nome do produto é obrigatório',
        ],

      }
    };
  },

  watch: {
    isOpen() {
      if (this.isOpen) {
        this.fetchUsers();
        this.resetForm();
        this.dialogTitle();
        this.populateForm();
      }
    },
  },

  methods: {

    dialogTitle() {
      this.title = this.action == 'create' ? 'Adicionar encomenda' : 'Editar encomenda';
    },

    closeDialog() {
      this.$emit('close-dialog');
      this.resetForm();
    },

    populateForm() {
      if (this.selectedOrder && (this.action == 'update')) {
        this.form.userId = this.selectedOrder.id;
        this.form.orderDate = this.selectedOrder.orderDate;
        this.form.product = this.selectedOrder.product;
      }
    },

    resetForm() {
      this.form.userId = null;
      this.form.orderDate = null;
      this.form.product = null;

      // Reset validation
      if (this.$refs.formCreateOrder)
        this.$refs.formCreateOrder.reset();
      this.$store.dispatch('orders/clearErrors');
    },

    toggleSubmitting() {
      this.submitting = !this.submitting;
    },

    async handleSubmit() {

      // Validate form
      if (!this.$refs.formCreateOrder.validate()) {
        return false;
      }

      this.toggleSubmitting();

      let payload = this.form

      let actionToDispatch = this.action == 'create'
        ? 'orders/create'
        : 'orders/update';

      let result = await this.$store.dispatch(actionToDispatch, payload);

      this.toggleSubmitting();

      if (result) {
        this.closeDialog();
      }
    },

    fetchUsers() {
      if (!this.users || !this.users.length) {
        this.$store.dispatch('users/fetchUsers');
      }
    },
  }
};
