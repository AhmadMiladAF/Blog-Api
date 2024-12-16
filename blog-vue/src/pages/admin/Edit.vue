<script>
import useAdminPosts from "@/api/useAdminPosts.js";
import { onMounted, watch } from "vue";
import _ from 'lodash';
import ResizeTextArea from "@/components/ResizeTextArea.vue";
  export default {
    components: {ResizeTextArea},
    props: {
      slug: {
        required: true,
        type: String
      }
    },
    setup(props) {
      const { post, fetchPost, patchPost } = useAdminPosts()

      const updatePost = async() => {
        await patchPost(props.slug)
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
  <ResizeTextArea v-if="post.title">
    <template v-slot:default="{ resize, el }"> <!--- TODO: Используем слот resize в наш textarea  и передаём @ событие input в ResizeTextArea и там принимаем событие как параметр e-->
      <!--- TODO: В данном случае, el является реактивной переменной, которая будет содержать ссылку на элемент textarea. --->
      <textarea :ref="el" v-model="post.title" @input="resize" class="w-full text-center text-4xl lg:text-6xl leading-10 font-extrabold tracking-tight text-gray-900 border-none focus:ring-0 resize-none"></textarea>
    </template>
  </ResizeTextArea>
  </div>
</template>

<style scoped>

</style>