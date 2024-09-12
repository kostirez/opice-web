import { Injectable, Type } from "@angular/core";
import { ViewComponent } from "./page.service";
import { CardsComponent } from "../cards/cards.component";
import { CardsWithTextComponent } from "../cards-with-text/cards-with-text.component";
import { PicAndTextComponent } from "../pic-and-text/pic-and-text.component";
import { TitleAndPicComponent } from "../title-and-pic/title-and-pic.component";
import { ProductsComponent } from "../products/products.component";
import { StepsComponent } from "../steps/steps.component";
import { InfoCardsComponent } from "../info-cards/info-cards.component";
import { ContactFormComponent } from "../contact-form/contact-form.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { TextAndInnerHTMLComponent } from "../text-and-inner-html/text-and-inner-html.component";
import { EshopMenuComponent } from "../eshop-menu/eshop-menu.component";
import { OrderMicrogreensComponent } from "../order-microgreens/order-microgreens.component";
import { FaqComponent } from "../faq/faq.component";

interface ComponentDef {
  type: Type<any>;
  strapiName: string;
}

const COMPONENTS_TABLE: ComponentDef[] = [
  {
    type: CardsComponent,
    strapiName: 'ComponentPageItemCards',
  },
  {
    type: CardsWithTextComponent,
    strapiName: 'ComponentPageItemCardsWithText',
  },
  {
    type: PicAndTextComponent,
    strapiName: 'ComponentPageItemPicAndText',
  },
  {
    type: TitleAndPicComponent,
    strapiName: 'ComponentPageItemTitleAndPics',
  },
  {
    type: ProductsComponent,
    strapiName: 'ComponentPageItemProducts',
  },
  {
    type: StepsComponent,
    strapiName: 'ComponentPageItemSteps',
  },
  {
    type: InfoCardsComponent,
    strapiName: 'ComponentPageItemInfoCards',
  },
  {
    type: ContactFormComponent,
    strapiName: 'ComponentPageItemContactForm',
  },
  {
    type: NotFoundComponent,
    strapiName: 'not-found',
  },
  {
    type: TextAndInnerHTMLComponent,
    strapiName: 'ComponentPageItemTextAndInnerHtml',
  },
  {
    type: EshopMenuComponent,
    strapiName: 'ComponentPageItemEshopMenu',
  },
  {
    type: OrderMicrogreensComponent,
    strapiName: 'ComponentPageItemOrderMicrogreens',
  },
  {
    type: FaqComponent,
    strapiName: 'ComponentPageItemFaq',
  },


]

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  getComponentType(strapiName): ComponentDef {
    return COMPONENTS_TABLE.find(c => c.strapiName == strapiName);
  }

  mapComponents(items: any[]): ViewComponent[] {
    const arr: ViewComponent[] = [];
    items.forEach(item => {
      const compDef = this.getComponentType(item.__typename);
      if(compDef && compDef.type) {
        arr.push(
          {
            type: compDef.type,
            data: {
              ...item
            }
          }
        )
      } else {
        console.log('component not added', item.__typename)
      }
    });
    return arr;
  }
}
