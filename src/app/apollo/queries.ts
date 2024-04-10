import { ComponentParams, QueryParams } from "./strapi-graphql.service";

export const addFilter = (filter: string, params:  QueryParams): QueryParams => {
  params.filtr = filter;
  return params;
}

export const HOME: QueryParams = {
  colection: 'home',
  filtr: '',
  items: [
    'head',
    'text',
    {
      colection: 'main_pic',
      filtr: '',
      items: ['url', 'name']
    },
    {
      colection: 'microgreens_use',
      filtr: '',
      items: ['url', 'name']
    },
  ]
};

export const ESHOP_MAIN: QueryParams = {
  colection: 'eshop',
  filtr: '',
  items: [
    'head',
    {
      compName: 'items',
      params: [
        'head',
        'url',
        {
          colection: 'pic',
          filtr: '',
          items: ['url', 'name']
        },
        {
          colection: 'icon',
          filtr: '',
          items: ['url', 'name']
        },
      ]
    } as ComponentParams
  ]
};


export const RESTAURANT: QueryParams = {
  colection: 'forRestaurant',
  filtr: '',
  items: [
    'head',
    'head_2',
    'text',
    'text_2',
    {
      colection: 'main_img',
      filtr: '',
      items: ['url']
    },
    {
      colection: 'how_it_works',
      filtr: '',
      items: ['url']
    },
    {
      colection: 'meals',
      filtr: '',
      items: ['url']
    },
    ],
};


export const OFFERS: QueryParams = {
  colection: 'restaurantOffer',
  filtr: '',
  items: [
    {
      compName: 'offers',
      params: [
        'head',
        'text',
      ]
    }
  ]
};


export const GROW: QueryParams = {
  colection: 'plant',
  filtr: '',
  items: [
    {
      compName: 'items',
      params: [
        'head',
        {
          colection: 'pic',
          filtr: '',
          items: ['url']
        },
      ]
    }
  ]
};


export const PAYMENT: QueryParams = {
  colection: 'payTransport',
  filtr: '',
  items: [
    {
      compName: 'paymentMethods',
      params: [
        'head',
        'text',
        'code',
        'price',
        {
          colection: 'icon',
          filtr: '',
          items: [ 'url' ],
        },
      ]
    }
  ]
};


export const TRANSPORT: QueryParams = {
  colection: 'payTransport',
  filtr: '',
  items: [
    {
      compName: 'transportMethods',
      params: [
        'head',
        'text',
        'code',
        'price',
        {
          colection: 'icon',
          filtr: '',
          items: [ 'url' ],
        },
      ]
    }
  ]
};



export const PRODUCTS = {
  colection: 'products',
  filtr: '',
  items: [
    'name',
    'description',
    'detail',
    'sizeLabel',
    'price',
    'category',
    {
      colection: 'colors',
      filtr: '',
      items: ['code', 'name']
    },
    {
      colection: 'sizes',
      filtr: '',
      items: ['name']
    },
    {
      colection: 'pictures',
      filtr: '',
      items: ['url']
    },
  ]
};
