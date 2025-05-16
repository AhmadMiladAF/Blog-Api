<script>
import useAdminPosts from "@/api/useAdminPosts.js";
import { onMounted, watch, watchEffect} from "vue";
import _ from 'lodash';
import ResizeTextArea from "@/components/ResizeTextArea.vue";
  export default {
    components: {ResizeTextArea},
    props: {
      uuid: {
        required: true,
        type: String
      }
    },
    setup(props) {
      const { post, fetchPost, patchPost } = useAdminPosts()

      const updatePost = async() => {
        await patchPost(props.uuid)
      }

      const replace = () => {
        const slug = post.value.slug

      post.value.slug = 'abc'
      }

      onMounted(async () => {
              await fetchPost(props.uuid)

        watchEffect(()=> {
          replace()
        })
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
    <div class="absolute w-full left-0 top-0 flex justify-between items-center space-x-6">
      <div class="flex-grow flex items-center">
        <span class="mr-1">/</span> <input type="text" class="p-0 border-none focus:ring-0 w-full" v-model="post.slug">
      </div>
      <div class="flex items-center space-x-6">
        <div>
          <span class="text-sm text-gray-500">Autosaved</span>
        </div>
        <div>
          <button class="text-sm font-medium">
              Published
          </button>
          <router-link
            v-if="post.slug"
            :to="{ name: 'post', params: { slug: post.slug } }"
            class="text-sm font-medium text-gray-800"
          >Preview</router-link>
          <span v-else class="text-sm text-gray-400">Preview</span>
        </div>
      </div>
    </div>
    <div>
  <ResizeTextArea v-if="post.title">
    <template v-slot:default="{ resize, el }"> <!--- TODO: Используем слот resize в наш textarea  и передаём @ событие input в ResizeTextArea и там принимаем событие как параметр e-->
      <!--- TODO: В данном случае, el является реактивной переменной, которая будет содержать ссылку на элемент textarea. --->
      <textarea :ref="el" v-model="post.title" @input="resize" class="w-full text-center text-4xl lg:text-6xl leading-10 font-extrabold tracking-tight text-gray-900 border-none focus:ring-0 resize-none"></textarea>
    </template>
  </ResizeTextArea>
  </div>

  </div>
</template>

<style scoped>

</style>
