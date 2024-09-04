import { DynamicParams, QueryParams } from "../../apollo/strapi-graphql.service";

const pageParts: DynamicParams[] = [
  {
    dynamicName: 'items',
    on: [
      {
        compName: 'ComponentPageItemCards',
        params: [
          'head',
          '__typename',
          {
            compName: 'cards',
            params: [
              'head',
              'text',
              'link',
              {
                colection: 'pic',
                filter: '',
                items: ['url']
              },
            ]
          }
        ]
      },
      {
        compName: 'ComponentPageItemCardsWithText',
        params: [
          'head',
          'text',
          '__typename',
          {
            compName: 'cards',
            params: [
              'head',
              'text',
              'link',
              {
                colection: 'pic',
                filter: '',
                items: ['url']
              },
            ]
          },
          {
            compName: 'btn',
            params: ['text', 'link', 'style']
          },
        ]
      },
      {
        compName: 'ComponentPageItemPicAndText',
        params: [
          'head',
          'text',
          'layout',
          {
            colection: 'pic',
            filter: '',
            items: ['url']
          },
          {
            compName: 'btn',
            params: ['text', 'link', 'style']
          },
          '__typename',
        ]
      },
      {
        compName: 'ComponentPageItemTitleAndPics',
        params: [
          'head',
          {
            colection: 'pics',
            filter: '',
            items: ['url']
          },
          '__typename',
        ]
      },
      {
        compName: 'ComponentPageItemProducts',
        params: [
          'category',
          'head',
          'pageSize',
          '__typename',
        ]
      },
      {
        compName: 'ComponentPageItemSteps',
        params: [
          'head',
          'style',
          {
            colection: 'pics',
            filter: '',
            items: ['url']
          },
          {
            compName: 'steps',
            params: [
              'head',
              'text',
            ]
          },
          '__typename',
        ]
      },
      {
        compName: 'ComponentPageItemInfoCards',
        params: [
          'head',
          {
            compName: 'cards',
            params: [
              'head',
              'text',
              'btnText',
              'btnLink'
            ]
          },
          '__typename',
        ]
      },
      {
        compName: 'ComponentPageItemContactForm',
        params: [
          'type',
          '__typename',
        ]
      },
      {
        compName: 'ComponentPageItemTextAndInnerHtml',
        params: [
          {
            compName: 'items',
            params: [
              'text',
              'html',
            ]
          },
          '__typename',
        ]
      },
      {
        compName: 'ComponentPageItemEshopMenu',
        params: [
          'head',
          {
            compName: 'items',
            params: [
              'head',
              'link',
            ]
          },
          '__typename',
        ]
      },
    ]
  },
]


export const PAGE: QueryParams = {
  colection: 'page',
  filter: '',
  items:
    [
      'name',
      'path',
      'showInMenu',
      'menuOrder',
      {
        compName: 'metaData',
        params: [
          'title',
          {
            compName: 'tags',
            params: ['name', 'content']
          }
          ]
      },
      ...pageParts
    ]

};

export const WEB_STRUCTURE: QueryParams = {
  colection: 'pages',
  filter: '',
  items: [
    'name',
    'path',
    'showInMenu',
    'menuOrder'
  ]
};
