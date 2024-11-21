<script setup lang="ts">
import Editor, { type OutputData } from '@editorjs/editorjs'
import { type API, type BlockMutationEvent } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
// import Warning from '@editorjs/warning'                                                    
// @ts-expect-error: This package does not support TypeScript yet, so we expect a type error. 
import Delimiter from '@coolbytes/editorjs-delimiter'
// @ts-expect-error: This package does not support TypeScript yet, so we expect a type error. 
import Alert from 'editorjs-alert'
// @ts-expect-error: This package does not support TypeScript yet, so we expect a type error. 
import Checklist from '@editorjs/checklist'
import NestedList from '@editorjs/nested-list'
// @ts-expect-error: This package does not support TypeScript yet, so we expect a type error. 
import SimpleImage from '@editorjs/simple-image'
// @ts-expect-error: This package does not support TypeScript yet, so we expect a type error. 
import Embed from '@editorjs/embed'
// @ts-expect-error: This package does not support TypeScript yet, so we expect a type error. 
import AudioPlayer from 'editorjs-audio-player'
// @ts-expect-error: This package does not support TypeScript yet, so we expect a type error. 
import EJLaTeX from 'editorjs-latex'
import Table from '@editorjs/table'
import CodeTool from '@editorjs/code'
// @ts-expect-error: This package does not support TypeScript yet, so we expect a type error. 
import RawTool from '@editorjs/raw'
// @ts-expect-error: This package does not support TypeScript yet, so we expect a type error. 
import Marker from '@editorjs/marker'
import Underline from '@editorjs/underline'
import InlineCode from '@editorjs/inline-code'
import { onMounted, onUnmounted, ref, watch } from 'vue'
/*import { useEditorJsDataStore } from '@/stores/editorJsDataStore'*/

//const editorsDataStore = useEditorJsDataStore() 
const editorjsRef = ref(null)

const props = defineProps(['modelValue', 'placeholder', 'readonly'])
// const props = defineProps({
//   modelValue,
//   placeholder: {
//     type: String,
//     default: "you can type here",
//   },
//   readonly: {
//     type: Boolean,
//     default: true,
//   },
// })
const emit = defineEmits(['update:modelValue'])

const editorContent = useState<OutputData>("editorContent")

let editor: Editor
let updatingModel = false

// model -> view                                                                              
function modelToView() {
  /*if (editorsDataStore.editorjsOutput) {                                                    
    editor.blocks.render(editorsDataStore.editorjsOutput)                                     
    return                                                                                    
  }*/

  if (!props.modelValue) {
    return
  }
  if (typeof props.modelValue === 'string') {
    editor.blocks.renderFromHTML(props.modelValue)
    return
  }
  editor.render(props.modelValue)
  // editor.render(editorContent.value)
}

// view -> model                                                                              
function viewToModel(api: API, event: BlockMutationEvent | BlockMutationEvent[]) {
  updatingModel = true
  editor
    .save()
    .then((outputData) => {
      console.log(event, 'Saving completed: ', outputData)
      emit('update:modelValue', outputData)
      //editorsDataStore.editorjsOutput = outputData
      editorContent.value = outputData
    })
    .catch((error) => {
      console.log(event, 'Saving failed: ', error)
    })
    .finally(() => {
      updatingModel = false
    })
}

onMounted(() => {
  editor = new Editor({
    holder: editorjsRef.value!,
    autofocus: true,
    placeholder: props.placeholder,
    readOnly: props.readonly,
    tools: {
      header: {
        class: Header,
        config: {
          placeholder: 'Enter a header',
          levels: [1, 2, 3, 4],
        },
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+O',
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: "Quote's author",
        },
      },
      alert: {
        class: Alert,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+A',
        config: {
          alertTypes: [
            'primary',
            'secondary',
            'info',
            'success',
            'warning',
            'danger',
            'light',
            'dark',
          ],
          defaultType: 'primary',
          messagePlaceholder: 'Enter something',
        },
      },
      delimiter: {
        class: Delimiter,
        config: {
          styleOptions: ['star', 'dash', 'line'],
          defaultStyle: 'star',
          lineWidthOptions: [8, 15, 25, 35, 50, 60, 100],
          defaultLineWidth: 25,
          lineThicknessOptions: [1, 2, 3, 4, 5, 6],
          defaultLineThickness: 2,
        },
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      list: {
        class: NestedList,
        inlineToolbar: true,
        config: {
          defaultStyle: 'unordered',
        },
      },
      image: SimpleImage,
      embed: Embed,
      // audioPlayer: AudioPlayer,                                                            
      // Math: {                                                                                 
      //   class: EJLaTeX,                                                                       
      //   shortcut: 'CMD+SHIFT+M',                                                              
      //   config: {                                                                             
      //     css: '.math-input-wrapper { padding: 5px; }',                                       
      //   },                                                                                    
      // },                                                                                      
      table: Table,
      // raw: RawTool,                                                                           
      code: CodeTool,
      Marker: Marker,
      underline: Underline,
      inlineCode: InlineCode,
    },
    data: props.modelValue as OutputData,
    onReady: modelToView,
    onChange: viewToModel,
  })
})

watch(
  () => props.modelValue,
  () => {
    if (!updatingModel) {
      modelToView()
    }
  },
)

onUnmounted(() => {
  editor.destroy()
})
</script>
<template>
  <button @click="editor.readOnly.toggle()">preview</button>
  <div class="editorjs min-h-[200px] text-gray-800" id="editorjs" ref="editorjsRef"></div>
</template>

<style>
/* Ensure headers have proper sizes */
h1.ce-header {
  font-size: 2.25rem; /* Tailwind text-3xl */
  font-weight: 700;   /* Bold */
  margin-bottom: 0.5rem;
}

h2.ce-header {
  font-size: 1.875rem; /* Tailwind text-2xl */
  font-weight: 600;
  margin-bottom: 0.5rem;
}

h3.ce-header {
  font-size: 1.5rem; /* Tailwind text-xl */
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* Ensure paragraph and default blocks are styled correctly */
h4.ce-header {
  font-size: 1.25rem; /* Tailwind text-base */
  line-height: 1.5rem; /* Tailwind leading-relaxed */
  margin-bottom: 1rem;
}
</style>
