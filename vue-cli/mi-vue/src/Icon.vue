<template>
  <span :class="cssClasses" aria-hidden="true"></span>
</template>

<script>
export default {
  props: ['img'], //Un atributo de este componente, y su valor se indicará en el HTML
  computed: {
    cssClasses: function(){
      return 'glyphicon glyphicon-' + this.img;
    }
  }
}
</script>
