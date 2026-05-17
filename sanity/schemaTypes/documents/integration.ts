export default {
  name: 'integration',
  title: 'Integrations',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' }, // e.g., "Real-time Webhooks"
    { name: 'method', type: 'string' }, // e.g., "PUSH" or "REST"
    { name: 'description', type: 'text' },
    { 
      name: 'codeSnippet', 
      title: 'Display Code Snippet', 
      type: 'text',
      description: 'The code to show in the terminal window (e.g., a curl command).'
    },
    { 
      name: 'iconType', 
      type: 'string', 
      description: 'Lucide icon name or language logo (e.g., python, javascript)' 
    }
  ],
  preview: {
    select: { title: 'title', subtitle: 'method' },
  }
}
