<script>
import {useEditor, EditorContent} from "@tiptap/vue-3"
import StarterKit from '@tiptap/starter-kit'
import { watch } from "vue"
export default {
  components: {EditorContent},

  props: {
      modelValue: {
        type: String,
        default: ''
      },
    teaserValue: {
      type: String,
      default: ''
    },
  },

 setup(props, { emit }) {
   // Инициализация редактора Tiptap с начальными настройками
  const editor = useEditor({
    // Устанавливаем начальное содержимое редактора из prop
    content: props.modelValue,
    // Подключаем базовые расширения редактора
        extensions: [
          StarterKit
        ],
    // Добавляем CSS-классы для стилизации редактора
    editorProps: {
      attributes: {
        class: 'min-w-full w-full text-gray-500 prose prose-sm lg:prose focus:outline-none'
      }
    },
    // При изменении содержимого редактора отправляем новое значение родителю
    onUpdate: (context) => {
      // Проверяем, есть ли параграф в содержимом редактора
      const teaser = context.editor.state.doc.content.content.find(
          c => c.type.name === 'paragraph'
      )
      // Если есть параграф, обновляем значение teaserValue
      emit('update:teaserValue', teaser.textContent)
      emit('update:modelValue', context.editor.getHTML())
    }
  })
   // Следим за изменениями prop modelValue
   watch(() => props.modelValue, (value) => {
     // Если содержимое редактора уже совпадает с новым значением, ничего не делаем
     if (editor.value.getHTML() === value) {
       return
     }
     // В противном случае обновляем содержимое редактора
    editor.value.commands.setContent(props.modelValue)
   })

   return {
     editor
   }
 },
}
</script>

<template>
    <EditorContent :editor="editor" />
</template>

<style scoped>

</style>