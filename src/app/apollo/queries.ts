import { ComponentParams, QueryParams } from "./strapi-graphql.service";

export const addFilter = (filter: string, params:  QueryParams): QueryParams => {
  params.filter = filter;
  return params;
}

export const HOME: QueryParams = {
  colection: 'home',
  filter: '',
  items: [
    'head',
    'text',
    'instruction_label',
    {
      colection: 'main_pic',
      filter: '',
      items: ['url', 'name']
    },
    {
      colection: 'microgreens_use',
      filter: '',
      items: ['url', 'name']
    },

    {
      colection: 'instruction_pic',
      filter: '',
      items: ['url', 'name']
    },
  ]
};

export const ESHOP_MAIN: QueryParams = {
  colection: 'eshop',
  filter: '',
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
          filter: '',
          items: ['url', 'name']
        },
        {
          colection: 'icon',
          filter: '',
          items: ['url', 'name']
        },
      ]
    } as ComponentParams
  ]
};


export const RESTAURANT: QueryParams = {
  colection: 'forRestaurant',
  filter: '',
  items: [
    'head',
    'head_2',
    'text',
    'text_2',
    {
      colection: 'main_img',
      filter: '',
      items: ['url']
    },
    {
      colection: 'how_it_works',
      filter: '',
      items: ['url']
    },
    {
      colection: 'meals',
      filter: '',
      items: ['url']
    },
    ],
};


export const OFFERS: QueryParams = {
  colection: 'restaurantOffer',
  filter: '',
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
  filter: '',
  items: [
    {
      compName: 'items',
      params: [
        'head',
        {
          colection: 'pic',
          filter: '',
          items: ['url']
        },
      ]
    }
  ]
};


export const PAYMENT: QueryParams = {
  colection: 'payTransport',
  filter: '',
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
          filter: '',
          items: [ 'url' ],
        },
      ]
    }
  ]
};


export const TRANSPORT: QueryParams = {
  colection: 'payTransport',
  filter: '',
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
          filter: '',
          items: [ 'url' ],
        },
      ]
    }
  ]
};



export const PRODUCTS = {
  colection: 'products',
  filter: '',
  items: [
    'name',
    'description',
    'price',
    'category',
    'optionLabel',
    {
      colection: 'colors',
      filter: '',
      items: ['code', 'name']
    },
    {
      colection: 'pictures',
      filter: '',
      items: ['url']
    },
    {
      compName: 'details',
      params: [
        'name',
        'text',
        {
          colection: 'pics',
          filter: '',
          items: ['url']
        },
      ]
    },
    {
      compName: 'productOptions',
      params: [
        'label',
        'price'
      ]
    },
  ]
};



export const MICROGREENS_BOX = {
  colection: 'microgreensBoxes',
  filter: '',
  items: [
    'name',
    'growDuration',
    'price',
    'description',
    {
      colection: 'pic',
      filter: '',
      items: ['url', 'name']
    },
    {
      compName: 'availableBoxes',
      params: [
        'sinceWhen',
        'count',
      ]
    },
  ]
};




export const INSTRUCTIONS = {
  colection: 'instruction',
  filter: '',
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
      filter: '',
      items: ['url']
    },
    {
      colection: 'skleniceImg',
      filter: '',
      items: ['url']
    },
    {
      colection: 'miskaImg',
      filter: '',
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
