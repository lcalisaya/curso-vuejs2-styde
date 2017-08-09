var vm = new Vue({
  el: '#app',
  data: {
    new_task: '',
    tasks: [
      {
        description: 'Aprender Vue.js',
        pending: true,
        editing: false
      },
      {
        description: 'Aprender a maquetar',
        pending: true,
        editing: true
      },
      {
        description: 'Escuchar radio',
        pending: false,
        editing: false
      }
    ]
  },
  methods: {
    createTask: function(){
      this.tasks.push(
        {
          description: this.new_task,
          pending: true,
          editing: false
        }
      );
      this.new_task = '';
    }
  }
});
