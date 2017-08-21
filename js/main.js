//Objeto vm
var EventBus = new Vue;

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

  props: ['task', 'index'], //las propiedades de 1 tarea
  data: function(){
    return {
      editing: false, //Forma parte del componente y no de las propiedades de la tarea
      draft: '',  //Forma parte del componente y no de las propiedades de la tarea
    };
  },
  created: function(){
    EventBus.$on('editing', function(index){ //Se está escuchando @editing. Cuando se dispare, hay que ejecutar la función anónima.
      if (this.index != index) {
        this.cancel();
      }
    }.bind(this));
  },

  methods: {   //Las acciones de 1 tarea
    toggleStatus: function(){
      this.task.pending = !this.task.pending;  //Se cambia el estado de la tarea: pendiente o no
    },
    edit: function(){
      // this.tasks.forEach(function(item){
      //   item.editing = false; //Para que todas las tareas se muestren sin estilos de edición
      // });
      EventBus.$emit('editing', this.index); //Se emite,se produce el evento @editing
      this.draft = this.task.description;
      this.editing = true; //Se edita una tarea a la vez, unicamente
    },
    update: function(){
      this.task.description = this.draft;
      this.editing = false; //Se confirman los cambios a la tarea
    },
    cancel: function(){
      this.editing = false; //Se cancelan los cambios a una tarea
    },
    remove: function(){
      this.$emit('remove', this.index); //$emit(nombre evento, argumento)
      //No se elimina la tarea, se crea un evento para que sea escuchado en la vista del objeto vm
    }
  }
});

var vm = new Vue({
  el: '#app',

  data: {
    new_task: '',
    tasks: [
      {
        description: 'Aprender Vue.js',
        pending: true
      },
      {
        description: 'Aprender a maquetar',
        pending: true
      },
      {
        description: 'Escuchar radio',
        pending: false
      }
    ]
  },
  // created: function(){
  //   this.tasks.forEach(function(tarea){
  //     this.$set(tarea, 'editing', false);
  //   }.bind(this) ); //Asocia esta función anónima al objeto vm

  //   Con ES6, la => function ya hace referencia a this
  //   this.tasks.forEach( tarea => {
  //     this.$set(tarea, 'editing', false);
  //  });
  // },
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
    },
    deleteTask: function(index){
      this.tasks.splice(index,1); //Elige el item con posición index y con '1' se elimina el item indicado
    }
  }
});
