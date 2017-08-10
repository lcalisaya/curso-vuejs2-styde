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
      this.tasks.push({ //Se guarda una tarea en la lista de tareas
          description: this.new_task,
          pending: true,
          editing: false
        });
      this.new_task = ''; //Para que el campo quede listo para ingresar una nueva tarea
    },
    toggleStatus: function(task){
      task.pending = !task.pending;  //Se cambia el estado de la tarea: pendiente o no
    },
    editTask: function(task){
      this.tasks.forEach(function(item){
        item.editing = false; //Para que todas las tareas se muestren sin estilos de edición
      });
      this.draft = task.description;
      task.editing = true; //Se edita una tarea a la vez, unicamente
    },
    updateTask: function(task){
      task.description = this.draft;
      task.editing = false; //Se confirman los cambios a la tarea
    },
    cancelUpdate: function(task){
      task.editing = false; //Se cancelan los cambios a una tarea
    },
    deleteTask: function(index){
      this.tasks.splice(index,1); //Elige el item con posición index y con '1' se elimina el item indicado
    },
    deleteCompleted: function(){
      this.tasks = this.tasks.filter(function(item){
        return item.pending; //Solo se devuelven las tareas que están pendientes
      });
    }
  }
});
