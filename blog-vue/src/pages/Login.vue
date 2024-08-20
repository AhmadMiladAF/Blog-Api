<template>
  <form @submit.prevent="login">
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup()
  {
    const store = useStore();

    const login = () => {
      /*todo: вызываем нашу функцию из store*/
      store.dispatch('login', {
        email: '123@123.de',
        password: '123',
      })
    }

    return {
      login
    }
  }
}
</script>

<style scoped>

</style>