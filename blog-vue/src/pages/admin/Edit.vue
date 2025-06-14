<script>
import useAdminPosts from "@/api/useAdminPosts.js";
import { onMounted, watch, watchEffect} from "vue";
import _ from 'lodash';
import ResizeTextArea from "@/components/ResizeTextArea.vue";
import Editor from "@/components/Editor.vue";
import slugify from "slugify";
  export default {
    components: {ResizeTextArea, Editor},
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

      const replaceSlug = () => {
        const slug = post.value.slug
        //TODO: Проверка на наличие пробелов в slug если она есть то заменим на -
        if(slug.charAt(slug.length - 1) === ' ') {
          return
        }

        post.value.slug = slug ? slugify(slug, {strict: true}) : post.value.uuid
      }

      onMounted(async () => {
              await fetchPost(props.uuid)

        watchEffect(()=> {
          replaceSlug()
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
        <!---- TODO: при клике на поле будет автоматически выделяться весь текст  ------>
        <span class="mr-1">/</span> <input type="text" class="p-0 border-none focus:ring-0 w-full" v-model="post.slug" spellcheck="false" v-on:click="$event.target.select()">
      </div>
      <div class="flex items-center space-x-6">
        <div>
          <span class="text-sm text-gray-500">Autosaved</span>
        </div>
        <div>
          <button v-on:click="post.published = !post.published" class="text-sm font-medium" v-bind:class="{'text-pink-500': post.published }">
              {{ !post.published ? 'Published' : 'Unpublished' }}
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
    <!--
  Компонент Editor:
  - v-model="post.body": двусторонняя привязка содержимого редактора к полю body объекта post
  - class="mt-16": добавляет верхний отступ для визуального разделения редактора от других элементов
    -->
  <Editor v-model="post.body" class="mt-16"/>
  </div>
</template>

<style scoped>

</style>
