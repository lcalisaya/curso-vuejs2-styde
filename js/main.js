//Para crear un componente de foma global
Vue.component('app-icon', {
  template: '<span :class="cssClasses" aria-hidden="true"></span>',
  props: ['img'], //Un atributo de este componente, y su valor se indicará en el HTML
  computed: {
    cssClasses: function(){
      return 'glyphicon glyphicon-' + this.img;
    }
  }
});
//Cada componente es como un objeto vm aparte
//Se representa una tarea individual, que está dentro del componente
Vue.component('app-task', {
  template: '#task-template',
  props: ['tasks','task', 'index'], //las propiedades de 1 tarea
  methods: {                            //las acciones de 1 tarea
    toggleStatus: function(){
      this.task.pending = !this.task.pending;  //Se cambia el estado de la tarea: pendiente o no
    },
    edit: function(){
      this.tasks.forEach(function(item){
        item.editing = false; //Para que todas las tareas se muestren sin estilos de edición
      });
      this.draft = this.task.description;
      this.task.editing = true; //Se edita una tarea a la vez, unicamente
    },
    update: function(){
      this.task.description = this.draft;
      this.task.editing = false; //Se confirman los cambios a la tarea
    },
    cancel: function(){
      this.task.editing = false; //Se cancelan los cambios a una tarea
    },
    remove: function(){
      this.tasks.splice(this.index,1); //Elige el item con posición index y con '1' se elimina el item indicado
    }
  }
});

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
    deleteCompleted: function(){
      this.tasks = this.tasks.filter(function(item){
        return item.pending; //Solo se devuelven las tareas que están pendientes
      });
    }
  }
});
