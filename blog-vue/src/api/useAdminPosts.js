import {ref} from "vue";
import axios from "axios";

export default function useAdminPosts()
{
    const posts = ref([])

    /*todo: Функция для вывода всех постов*/
    const fetchPosts = async () => {
        let response = await axios.get('/api/admin/posts')

        posts.value = response.data.data // пишем data 2 раза потому что 1 это сам массив, а 2 это внутри массива ещё массив данных
    }

    return {
        posts,
        fetchPosts
    }
}