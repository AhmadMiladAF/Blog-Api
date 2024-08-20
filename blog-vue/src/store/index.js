import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state() {
        return {
            authenticated: false,
            user: null
        }
    },
    mutations: {
        SET_AUTHENTICATED(state, authenticated) {
            state.authenticated = authenticated
        },
        SET_USER(state, user) {
            state.user = user
        }
    },
    actions: {
        authenticate ({ commit }) {
           return axios.get('/api/user').then((response)=> { /* делаем return для Promise потому что в main.js мы всё занесли в store.dispatch('authenticate') */
                commit('SET_AUTHENTICATED', true)
                commit('SET_USER', response.data)
            }).catch(() => {
                //clear очищаем
                commit('SET_AUTHENTICATED', false)
                commit('SET_USER', null)
            })
        },

        async login({ dispatch }, credentials)
        {
            /* todo: путь в нашем laravel папке config/cors.php  в paths*/
            await axios.get('/sanctum/csrf-cookie')

            await axios.post('/login', credentials)

            dispatch('authenticate') /* после входа вызываем этот метод*/

            /*let user = await axios.get('/api/user')
            console.log(user.data)*/


        }
    },
    getters: {
        authenticated(state)
        {
            return state.authenticated
        },

        user(state) {
            return state.user
        }
    }
})