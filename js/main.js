var vm = new Vue({
  el: '#app',
  data: {
    new_task: '',
    draft: '',
    tasks: [
      {
        description: 'Aprender Vue.js',
        pending: true,
        editing: false
      },
      {
        description: 'Aprender a maquetar',
        pending: true,
        editing: false
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
    },
    toggleStatus: function(task){
      task.pending = !task.pending;
    },
    editTask: function(task){
      this.tasks.forEach(function(item){
        item.editing = false;
      });
      this.draft = task.description;
      task.editing = true;
    },
    updateTask: function(task){
      task.description = this.draft;
      task.editing = false;
    },
    cancelUpdate: function(task){
      task.editing = false;
    }
  }
});
