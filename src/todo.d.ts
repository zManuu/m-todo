declare type TodoEntry = {
  fileUrl: string
  fullLine: string
  line: number
  todo: string
}

declare type Nullable<T> = T | undefined