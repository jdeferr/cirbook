export enum MessageEnum {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success'
}

export interface Message {
  title: string
  message: string
  type: MessageEnum
}
