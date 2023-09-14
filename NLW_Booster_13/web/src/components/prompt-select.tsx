import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface Prompt {
  id: string
  title: string
  template: string
}

interface PromptSelectedProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect(props: PromptSelectedProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  async function loadPrompts() {
    const response = await api.get('/prompt')

    setPrompts(response.data.prompts)
  }
  useEffect(() => {
    // api.get('/prompt').then()
    loadPrompts()
  }, [])

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
