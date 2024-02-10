export enum LinkTypeEnum {
  EXTERNAL = 'external',
  INTERNAL = 'internal'
}

export interface Link {
  name: string
  url: string
  type: LinkTypeEnum
}
