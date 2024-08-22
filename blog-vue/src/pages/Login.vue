<template>
    <div class="max-w-md mx-auto w-full">
      {{ form.email }}
      <form class="mt-8 space-y-6" @submit.prevent="attemptLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input type="text" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="you@example.de" v-model="form.email">
            </div>
          </div>

          <div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1">
                <input type="password" name="password" id="password" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" v-model="form.password">
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
      </form>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive } from "vue";

export default {
  setup()
  {
    const store = useStore();
/*todo: Данные из формы через v-model добавили в наших input*/
    const form = reactive({
      email:'',
      password: ''
    })

    const attemptLogin = () => {
      /*todo: вызываем нашу функцию из store*/
      store.dispatch('login', form)
    }

    return {
      attemptLogin,
      form
    }
  }
}
</script>

<style scoped>

</style>