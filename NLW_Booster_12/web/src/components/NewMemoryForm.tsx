'use client'

import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'
import { FormEvent } from 'react'

import { MediaPicker } from '@/components/MediaPicker'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl') as File

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)
      const uploadResponse = await api.post('/upload', uploadFormData)
      console.log(uploadResponse.data)

      coverUrl = uploadResponse.data.fileUrl

      console.log(coverUrl)
    }

    await api.post(
      '/memories',
      {
        content: formData.get('content'),
        coverUrl,
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${Cookie.get('token')}`,
        },
      },
    )

    router.push('/')
  }
  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 
            hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          tornar memória publica
        </label>
      </div>
      <MediaPicker />
      <textarea
        name="content"
        spellCheck={false}
        id=""
        cols={30}
        rows={10}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />
      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
