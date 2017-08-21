import Vue from 'vue'
import App from './App.vue'

//Para crear un componente de foma global y no local
// Vue.component('app-icon', {
//   template: '<span :class="cssClasses" aria-hidden="true"></span>',
//   props: ['img'], //Un atributo de este componente, y su valor se indicará en el HTML
//   computed: {
//     cssClasses: function(){
//       return 'glyphicon glyphicon-' + this.img;
//     }
//   }
// });

var vm = new Vue({
  el: '#app',
  render: h => h(App)
})

//Nuestra aplicación se llama 'App'. Es un módulo de Tareas.
//Cada componente tiene su propia plantilla, su código javascript y su css.
