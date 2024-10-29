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
let editor : any = null

// ... (rest of your code)

const updateContent = () => {

  emit('update', editor.container.querySelector(".ql-editor").innerHTML);
  
};

const doPaste  = () => {
  
  if (editor) {
    editor.pasteHTML(`${document.querySelector(".ql-editor")!.innerHTML} ${text.value}`);
    dialog.value = false;
  } else {
    console.error('Quill editor is not ready yet. Wait for onEditorReady event.');

  }
  

}


const onEditorReady = (data : any) =>  {
  editor = data

    const rtlButton = editor.getModule('toolbar').container.querySelector('.ql-direction');
  if (rtlButton) {
    rtlButton.click();
  } else {
    console.error('RTL button not found');
  }

  const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    // Check if the mutation target is an <img> element
    if (mutation.target.tagName === 'IMG') {
      updateContent();  // Call updateContent only when an <img> element is modified
    }
  }
});

    // Observe changes in the editor's `.ql-editor` element for any blot mutations
    observer.observe(editor.container.querySelector(".ql-editor")!, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['style']
    });


    // const toolbar = document.querySelector('.ql-toolbar');
    // const editor2 = document.querySelector('.ql-editor');

    // if (toolbar && editor2) {
    //     const toolbarOriginalTop = toolbar.getBoundingClientRect().top;


    //     window.addEventListener('scroll', function() {
    //   console.log("ddddjfbvk")

    //         const editorTop = editor2.getBoundingClientRect().top;
    //         if (editorTop < 0) {
    //             toolbar.style.position = 'fixed';
    //             toolbar.style.top = '0';
    //         } else {
    //             toolbar.style.position = 'sticky';
    //             toolbar.style.top = `${toolbarOriginalTop}px`;
    //         }
    //     },true);
    // }

}

const handleScroll = () => {
  const toolbar = editor.getModule('toolbar').container  ;
  const mainEditor = editor.container.querySelector(".ql-editor") ;

  if (toolbar && mainEditor) {
    const editorRect = mainEditor.getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();


    // Check if the toolbar is within the editor bounds
    if (toolbarRect.top > editorRect.bottom) {
      toolbar.classList.add('hidden-toolbar');
    } else {
      toolbar.classList.remove('hidden-toolbar');
    }
  }
};


onMounted(() => {
  window.addEventListener('scroll', handleScroll,true);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

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

  

]

let modules: {
  sticky_toolbar: true
}
 
 
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
.ql-toolbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  transition: opacity 0.3s ease, visibility 0.3s ease;
 
}

.hidden-toolbar {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}



</style>