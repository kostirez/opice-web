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
    'instruction_label',
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

    {
      colection: 'instruction_pic',
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
    'promotion',
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
        'freeFrom',
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
        'freeFrom',
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
    {
      compName: 'details',
      params: [
        'name',
        'text',
        {
          colection: 'pics',
          filtr: '',
          items: ['url']
        },
      ]
    },
  ]
};



export const INSTRUCTIONS = {
  colection: 'instruction',
  filtr: '',
  items: [
    'head',
    'text',
    'headSklenice',
    'headMisky',
    'table_1',
    'table_2',
    'toSprout',
    'toNotSprout',
    {
      colection: 'main_pic',
      filtr: '',
      items: ['url']
    },
    {
      colection: 'skleniceImg',
      filtr: '',
      items: ['url']
    },
    {
      colection: 'miskaImg',
      filtr: '',
      items: ['url']
    },
    {
      compName: 'steps_sklenice',
      params: [
        'head',
        'text',
      ]
    },
    {
      compName: 'steps_sitka',
      params: [
        'head',
        'text',
      ]
    },
  ]
};
