import {ref} from "vue";
import axios from "axios";

export default function usePosts()
{
    const posts = ref([])
    const post = ref([])

    /*todo: Функция для вывода всех постов*/
    const fetchPosts = async () => {
        let response = await axios.get('/api/posts')

        posts.value = response.data.data // пишем data 2 раза потому что 1 это сам массив, а 2 это внутри массива ещё массив данных
    }
    /*todo: Функция для вывода 1 постов через slug*/
    const fetchPost = async (slug) => {
        let response = await axios.get(`/api/posts/${slug}`)

        post.value = response.data.data
    }


    return {
        posts,
        post,
        fetchPosts,
        fetchPost
    }
}