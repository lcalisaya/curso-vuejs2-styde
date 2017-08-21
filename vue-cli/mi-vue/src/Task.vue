<template>
<li class="list-group-item" :class="{ editing: editing, completed: !task.pending }">
  <a @click="toggleStatus">
    <app-icon :img="task.pending ? 'unchecked' : 'check' "></app-icon>
  </a>

  <template v-if="!editing">
    <span class="description">{{ task.description }}</span>
    <div>
      <a @click="edit">
        <app-icon img="edit"></app-icon>
      </a>
      <a @click="remove"> <!--evento que hará que se ejecute el evento personalizado @remove-->
        <app-icon img="trash"></app-icon>
      </a>
    </div>
  </template>

  <template v-else>
    <input type="text" v-model="draft">
    <div>
      <a @click="update">
        <app-icon img="ok"></app-icon>
      </a>
      <a @click="cancel">
        <app-icon img="remove"></app-icon>
      </a>
    </div>
  </template>
</li>
</template>

<script>
import  EventBus from './event-bus.js';
import Icon from './Icon.vue';

export default {
  components: {
    'app-icon': Icon
  },
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
}
</script>
