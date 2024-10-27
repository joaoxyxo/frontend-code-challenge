import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';

export default {
  name: 'DatePicker',

  props: {
    value: {
      type: String,
      required: false,
      default: null
    },
    label: {
      type: String,
      required: false,
      default: 'Seleciona uma Data'
    },
    rules: {
      type: Array,
      required: false,
      default: () => [(v) => !!v || 'Por favor selecione uma data']
    },
    hideDetails: {
      type: Boolean,
      required: false,
      default: false
    },
    dense: {
      type: Boolean,
      required: false,
      default: false
    },
    outlined: {
      type: Boolean,
      required: false,
      default: true
    },
    dateMinValue: {
      type: String,
      required: false,
      default: undefined
    },
    dateMaxValue: {
      type: String,
      required: false,
      default: undefined
    },
    dateFormat: {
      type: String,
      required: false,
      default: 'YYYY-MM-DD'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
  },

  data() {
    return this.initialState();
  },

  computed: {
    // Synthetic v-model
    computedValue: {
      get: function () {
        return this.finalValue;
      },
      set: function (newValue) {
        this.finalValue = newValue;
        this.emitChange();
      }
    },
    // Synthetic v-model
    showMessageComputed: {
      get: function () {
        return this.showMessage;
      },
      set: function (newValue) {
        this.showMessage = newValue;
      }
    },

    dateText: function () {
      let text = this.finalValue
      return moment(text).format(this.dateFormat);
    }
  },

  watch: {
    // Synthetic v-model
    value: function (newValue) {
      this.computedValue = newValue;
    },

  },

  created() {
    // Save data passed to this component via v-model
    this.finalValue = this.value;

    // Preload showMessageComputed
    this.showMessageComputed = this.showMessage;
 
    // Populate with default values
    this.populateDefault();
  },

  methods: {
    initialState() {
      return {
        menu: false,
        date: moment().format('YYYY-MM-DD'),
        finalValue: null,
        showMessage: false,
      }
    },

    populateDefault() {

      if (_.isEmpty(this.value)) {
        this.computedValue = this.date;
      }
    },

    emitChange() {
      this.$emit('input', this.computedValue);
      this.$emit('change', this.computedValue);
    },
  }
}
