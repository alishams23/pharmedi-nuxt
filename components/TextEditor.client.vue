<template>
 

  <client-only>
    <quill-editor  @ready="onEditorReady($event)" class="rounded-b-lg" :ref="editorContent" content-type="html" v-model:content="content" theme="snow"
      :toolbar="toolbar"  :modules="modules" @textChange="updateContent"   />
  </client-only>
</template>
<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ref, defineEmits } from 'vue';
const props = defineProps<{
  content: string,
}>();

const { content } = toRefs(props);
const emit = defineEmits(['update']);
const editorContent = ref(null);
let dialog = ref();
let text = ref('');
let editor = null

// ... (rest of your code)

const updateContent = () => {

  emit('update', editor.container.querySelector(".ql-editor").innerHTML);
  
};
const doPaste  = () => {
  
  if (editor) {
    editor.pasteHTML(`${document.querySelector(".ql-editor").innerHTML} ${text.value}`);
    dialog.value = false;
  } else {
    console.error('Quill editor is not ready yet. Wait for onEditorReady event.');

  }
  

}


const onEditorReady = (data) =>  {
  editor = data
 
    const rtlButton = editor.getModule('toolbar').container.querySelector('.ql-direction');
  if (rtlButton) {
    rtlButton.click();
  } else {
    console.error('RTL button not found');
  }

}

let toolbar = [
  ["bold", "italic", "underline", "strike"],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] },],
  ["link", "blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ direction: "rtl" }],
  ['image'],
  [{ custom: 'insert custom' }],
  

]

let modules: {}
 
 
    const { QuillEditor, Quill } = await import('@vueup/vue-quill')
    const { vueApp } = useNuxtApp()
   
      vueApp.component('QuillEditor', QuillEditor)

    const ImageUploader = await import('quill-image-uploader')
    const BlotFormatter = await import('quill-blot-formatter/dist/BlotFormatter')


 

    modules = [
   
      {
        name: 'blotFormatter',
        module: BlotFormatter.default,
        options: {}
      },
      
      
    //   {
    //     name: 'quillEmoji',
    //     module: quillEmoji,
    //     options: {
    //       "emoji-toolbar": true,
    // "emoji-textarea": true,
    // "emoji-shortname": true,
    //     }
    //   },
   
     
      
      
      // {
      //   name: 'quillEmoji',
      //   module: quillEmoji,
      //   options: {}
      // }
    ]

 
</script>

<style >
.ql-editor{
    min-height:200px;
}
.ql-custom {
  width: 32px;
  height: 32px;
  background-color: #ccc;
  font-size: 13px;
 
  /* Add any other styles as needed */
}
.ql-toolbar{
  direction: rtl;
}
.ql-header.ql-picker{
  direction: ltr;
}
</style>