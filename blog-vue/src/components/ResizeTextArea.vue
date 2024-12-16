<script>
import { ref, onMounted } from 'vue';
  export default {
    setup(props, context){
      const el = ref(null);
      const resizeTarget = (target) => { // TODO: target это textarea которое содержит в себе событие input
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
      }
      const resize = (e) => { //TODO: Функция resize принимает событие e то-есть @input и выводим это событие потому что e это event событие
        resizeTarget(e.target) //TODO: Вызываем функцию resizeTarget и передаём в неё  событие input и textarea
      };

      onMounted(() => {
        resizeTarget(el.value) //TODO: Вызываем функцию resizeTarget и передаём в неё значение textarea
      })
      return() => context.slots.default({
        resize,
        el
      })
    },
  }
</script>

<template>

</template>

<style scoped>

</style>