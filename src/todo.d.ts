declare type WorkspaceType = 'file' | 'folder' | 'empty'

declare type TodoEntry = {
  fileUrl: string
  fullLine: string
  line: number
  todo: string
}