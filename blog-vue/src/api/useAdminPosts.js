import {ref} from "vue";
import axios from "axios";

export default function useAdminPosts()
{
    const posts = ref([])
    const post = ref([])

    /*todo: Функция для вывода всех постов*/
    const fetchPosts = async () => {
        let response = await axios.get('/api/admin/posts')

        posts.value = response.data.data // пишем data 2 раза потому что 1 это сам массив, а 2 это внутри массива ещё массив данных
    }
    //TODO Функция для  создания поста
    const createPost = async () => {
        let response = await axios.post('/api/admin/posts')

        return response.data.data
    }

    //TODO Функция для  изменения поста
    const fetchPost = async (slug) => {
        let response = await axios.get(`/api/admin/posts/${slug}/edit`)

        post.value = response.data.data // пишем data 2 раза потому что 1 это сам массив, а 2 это внутри массива ещё массив данных
    }

    return {
        posts,
        post,
        fetchPosts,
        createPost,
        fetchPost
    }
}