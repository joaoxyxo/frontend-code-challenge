import { mapGetters } from 'vuex';

export default {
  name: 'DialogAddEditUsers',
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
      error: 'users/error',
      selectedUser: 'users/selectedUser',
    }),
  },

  components: {

  },

  data() {
    return {
      title: '',
      submitting: false,
      form: {
        fullName: null,
        email: null,
        password: null,
        id: null,
      },
      rules: {
        fullName: [
          v => !!v || 'Por favor adicione um nome',
          v => (v && v.length <= 50) || 'O nome deve ter menos de 50 caracteres',
        ],
        email: [
          v => !!v || 'Por favor adicione um email',
          v => /.+@.+\..+/.test(v) || 'Por favor adicione um email válido',
        ],
        password: [
          v => !!v || 'Por favor adicione uma password',
          v => (v && v.length >= 6) || 'A password deve ter pelo menos 6 caracteres',
        ],
      }
    };
  },

  watch: {
    isOpen() {
      if (this.isOpen) {
        this.resetForm();
        this.dialogTitle();
        this.populateForm();
      }
    },
  },

  methods: {

    dialogTitle() {
      this.title = this.action == 'create' ? 'Adicionar jogador' : 'Editar jogador';
    },

    closeDialog() {
      this.$emit('close-dialog');
      this.resetForm();
    },

    populateForm() {
      if (this.selectedUser && (this.action == 'update')) {
        this.form.fullName = this.selectedUser.fullName;
        this.form.email = this.selectedUser.email;
        this.form.id = this.selectedUser.id;
      }
    },

    resetForm() {
      this.form.fullName = null;
      this.form.email = null;
      this.form.password = null;

      // Reset validation
      if (this.$refs.formCreateUser)
        this.$refs.formCreateUser.reset();
      this.$store.dispatch('users/clearErrors');
    },

    toggleSubmitting() {
      this.submitting = !this.submitting;
    },

    async handleSubmit() {

      // Validate form
      if (!this.$refs.formCreateUser.validate()) {
        return false;
      }

      this.toggleSubmitting();

      let payload = this.form


      let actionToDispatch = this.action == 'create'
        ? 'users/create'
        : 'users/update';

      let result = await this.$store.dispatch(actionToDispatch, payload);

      this.toggleSubmitting();

      if (result) {
        this.closeDialog();
      }
    },
  },
};
