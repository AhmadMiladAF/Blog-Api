<script>
import useAdminPosts from "@/api/useAdminPosts.js";
import { onMounted, watch } from "vue";
import _ from 'lodash';
  export default {
    props: {
      slug: {
        required: true,
        type: String
      }
    },
    setup(props) {
      const { post, fetchPost } = useAdminPosts()

      const updatePost = () => {
        console.log('update post')
      }

      onMounted(async () => {
              await fetchPost(props.slug)
          //TODO: Проверка на изменение title через свойство cloneDeep из lodash и watch
          //TODO: и посредством debounce из lodash мы делаем запрос только после 500 милисекунд после последнего изменения чтобы нне было много запрос
            watch(() => _.cloneDeep(post), _.debounce(() => {
              updatePost()
            },500))
      })

      return {
        post,
        fetchPost
      }
    },
  }
</script>

<template>

    <div>
      <textarea v-model="post.title" class="w-full text-center text-4xl lg:text-6xl leading-10 font-extrabold tracking-tight text-gray-900 border-none focus:ring-0 resize-none"></textarea>
    </div>

</template>

<style scoped>

</style>