<script>
import dayjs  from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime) // Äктивация плагина relativeTime для dayjs, чтобы показать время в относительном формате, например "5 минут назад"
import { ref, watch } from "vue";
export default {
  props: {
    date: {
      required: true
    }
  },
  setup(props, context) {
    let date = ref(props.date)
    const now = ref(dayjs()) // Получаем текущее время

    // Слушаем изменения свойства date и обновляем локальную переменную date чтобы  время которая показывается в компоненте обновлялось
    watch(()=> props.date, (value) => {
      console.log('date changed', value)

      date.value = value
    })

    //date every minute как бы проверяет изменилось ли время

    setInterval(()=> {
      now.value = dayjs()
    }, 60000)

    return() => context.slots.default({
      fromNow: dayjs(date.value).from(now.value)
    })
  },
}
</script>

<template>

</template>

<style scoped>

</style>