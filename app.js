const app = Vue.createApp({
    data() {
        return {
            courseGoal: "ababababa",
            link: 'abc.com',
            dignity: '',
            num: ''
        }
    },
    methods: {
        outputGoal() {
            this.num = Math.random().toFixed(3);
            this.dignity = this.num >= 0.5 ? 'Learn PHP' : 'Learn Vuejs';
        },
        closeDignity() {
            this.dignity = ''
        }
    }
});

app.mount('#user-goal')
