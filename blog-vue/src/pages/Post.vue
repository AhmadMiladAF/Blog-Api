 <template>

  <h1 class="block text-center text-4xl sm:text-6xl leading-10 font-extrabold tracking-tight text-gray-900">
        {{ post.title }}
  </h1>
  <!--todo: Для вывода html элементов из объекта через v-html-->
  <div class="mt-16 text-gray-500 prose prose-sm lg:prose" v-html="post.body"></div> <!-- todo: стиль из плагина tailwindcss/typography - prose для стилизации html элементов из объекта -->
</template>

<script>
import { onMounted } from "vue";
import usePosts from "@/api/usePosts.js";

export default {
  props: {
    slug: {
      required: true,
      type: String
    }
  },
  setup(props)
  {
    const { post, fetchPost } = usePosts()

    onMounted(() => fetchPost(props.slug)) /*todo: С параметром надо стрелочной функцией писать*/


    return {
        post,
        fetchPost
    }
  }
}
</script>

<style scoped>

</style>