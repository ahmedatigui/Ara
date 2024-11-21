<script setup lang="ts">
import type { OutputData } from '@editorjs/editorjs';


const client = useSupabaseClient()
const editorContent = useState<OutputData>("editorContent", () => ({
  "time": 1732020178568,
  "blocks": [
    {
      "id": "example-header",
      "type": "header",
      "data": {
        "text": "The title of this post",
        "level": 1
      }
    },
    {
      "id": "example-text",
      "type": "paragraph",
      "data": {
        "text": "what's not on your mind?",
      }
    }
  ],
  "version": "2.30.7"
}))

const publishPost = async () => {
  // const hash = (await $fetch('/api/test')).blogs.length
  const title = editorContent.value.blocks.find(block => block.type === "header")?.data.text
  // const postId = `${title}-${hash}`

  console.log(title)


  if (!title) {
    // editorContent.value.blocks.unshift({
    //   id: "post-title",
    //   type: "header",
    //   data: {
    //     text: "Enter a title",
    //     level: 1
    //   }
    // })
    alert('Please enter a title')
    return
  }

  console.log(`Publishing post with content: ${JSON.stringify(editorContent.value)}`)

  const apiData = await $fetch('/api/publish', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      // post_id: postId,
      content: editorContent.value,
    })
  })
  // if (apiError) console.log(apiError)
}

</script>
<!--<template>
  <div>
    <ClientOnly fallback-tag="span" fallback="Loading editor...">
      <button @click="publishPost">Publish</button>
      <Editor :modelValue="editorContent" placeholder="say it again!" readonly="false" />
      <pre>{{ editorContent }}</pre>
    </ClientOnly>
  </div>
</template>-->


<template>
  <div class="container mx-auto px-6 py-8">
    <!-- Publish Button and Editor -->
    <div class="space-y-6">
      <!-- Publish Button -->
      <ClientOnly fallback-tag="span" fallback="Loading editor...">
        <Button variant="default" class="px-6 py-3" @click="publishPost">
          Publish
        </Button>

        <!-- Editor -->
        <div class="bg-white shadow-md rounded-lg border border-gray-200 p-4">
          <Editor
            :modelValue="editorContent"
            placeholder="Say it again!"
            :readonly="false"
          />
        </div>

        <!-- Editor Content Preview -->
        <div class="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 class="text-lg font-medium text-gray-700 mb-2">Editor Content</h2>
          <pre class="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
{{ editorContent }}
          </pre>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

