export enum LinkTypeEnum {
  EXTERNAL = 'external',
  INTERNAL = 'internal'
}

export interface Link {
  name: string
  url: string
  type: LinkTypeEnum
}

export enum ButtonTypeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DISABLE = 'disable'
}
