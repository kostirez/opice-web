
export type TextItem = {
  head: string,
  text: string,
}

export type TextPicItem =
  TextItem & {
  pic: Picture,
}

export type PicItem = {
  head: string,
  pic: Picture,
}

export type MenuItem = {
  head: string,
  url: string,
}

export type MenuPicItem =
  MenuItem & {
  pic: Picture,
  icon?: Picture,
}

export type Picture = {
  url: string,
  name?: string,
}

export type ProductOption = {
  label: string,
  price: number,
}

export type PicArray = Picture[];
