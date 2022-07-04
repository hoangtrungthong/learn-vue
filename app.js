const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: '',
      step: ''
    };
  },
  methods: {
    add() {
      this.counter = this.counter + this.step
    },
    reduce() {
      this.counter = this.counter - this.step
    },
    setName(e) {
      this.name = e.target.value
    },
    setStep(e) {
      this.step = parseInt(e.target.value)
    }
  }
});

app.mount('#events');
