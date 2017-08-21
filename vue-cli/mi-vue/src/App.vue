<template>
  <div id="app" class="container">
    <h2>Tareas</h2>

    <ul class="list-group tasks">
      <li is="app-task" v-for="(tarea, indice) in tasks" :index="indice" :task="tarea" @remove="deleteTask"></li> <!-- Este componente hace referencia a una tarea puntual -->
    </ul>                                                                                                                   <!--evento personal @remove-->

    <p v-if="tasks.length != 0">
      <a @click="deleteCompleted">Eliminar tareas completadas</a>
    </p>
    <h4 v-else>Cantidad de tareas: 0. Complete el campo "Descripción" e ingrese una nueva tarea.</h4>

      <form class="new-task-form" @submit.prevent="createTask">
        <input type="text" class="form-control" v-model="new_task" placeholder="Descripción de tarea">
        <button class="btn btn-primary">Crear tarea</button>
      </form>

    <footer>
      <p>&copy; 2017 Styde.net.</p>
    </footer>
  </div>

</template>

<!--  Vamos a exportar un objeto para que se pueda utilizar en main.js -->
<script>

import Task from './Task.vue'
export default {
  components: {
    'app-task': Task
  },
    data: function() {  //Se trabaja con un componente, por eso data tiene que ser función que retorne un objeto
      return {
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
      }
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
    },
    deleteTask: function(index){
      this.tasks.splice(index,1); //Elige el item con posición index y con '1' se elimina el item indicado
    }
  }
}
</script>
