interface LexicalNode {
  type?: string
  text?: string
  children?: LexicalNode[]
  tag?: string
  listType?: 'number' | 'bullet'
  url?: string
  newTab?: boolean
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  [key: string]: any
}

interface LexicalContent {
  root?: {
    children?: LexicalNode[]
  }
  [key: string]: any
}

export function serializeRichText(content: LexicalContent | string | null | undefined): string {
  if (!content) return ''
  
  if (typeof content === 'string') return content

  // Handle Lexical rich text format
  if (content.root && content.root.children) {
    return serializeChildren(content.root.children)
  }

  return ''
}

function serializeChildren(children: LexicalNode[]): string {
  if (!Array.isArray(children)) return ''
  
  return children
    .map((child: LexicalNode) => {
      if (child.type === 'paragraph') {
        const content = child.children ? serializeInlineContent(child.children) : ''
        return `<p>${content}</p>`
      }
      
      if (child.type === 'heading') {
        const level = child.tag || 'h2'
        const content = child.children ? serializeInlineContent(child.children) : ''
        return `<${level}>${content}</${level}>`
      }
      
      if (child.type === 'list') {
        const tag = child.listType === 'number' ? 'ol' : 'ul'
        const items = child.children?.map((item: LexicalNode) => {
          const itemContent = item.children ? serializeInlineContent(item.children) : ''
          return `<li>${itemContent}</li>`
        }).join('') || ''
        return `<${tag}>${items}</${tag}>`
      }
      
      if (child.type === 'quote') {
        const content = child.children ? serializeInlineContent(child.children) : ''
        return `<blockquote>${content}</blockquote>`
      }
      
      if (child.type === 'link') {
        const url = child.url || '#'
        const content = child.children ? serializeInlineContent(child.children) : ''
        const target = child.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
        return `<a href="${url}"${target}>${content}</a>`
      }
      
      // Handle text nodes
      if (child.text !== undefined) {
        let text = child.text
        
        // Apply formatting
        if (child.bold) text = `<strong>${text}</strong>`
        if (child.italic) text = `<em>${text}</em>`
        if (child.underline) text = `<u>${text}</u>`
        if (child.strikethrough) text = `<s>${text}</s>`
        if (child.code) text = `<code>${text}</code>`
        
        return text
      }
      
      return ''
    })
    .join('')
}

function serializeInlineContent(children: LexicalNode[]): string {
  if (!Array.isArray(children)) return ''
  
  return children
    .map((child: LexicalNode) => {
      if (child.type === 'link') {
        const url = child.url || '#'
        const content = child.children ? serializeInlineContent(child.children) : ''
        const target = child.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
        return `<a href="${url}"${target}>${content}</a>`
      }
      
      if (child.text !== undefined) {
        let text = child.text
        
        // Apply formatting
        if (child.bold) text = `<strong>${text}</strong>`
        if (child.italic) text = `<em>${text}</em>`
        if (child.underline) text = `<u>${text}</u>`
        if (child.strikethrough) text = `<s>${text}</s>`
        if (child.code) text = `<code>${text}</code>`
        
        return text
      }
      
      return ''
    })
    .join('')
}
