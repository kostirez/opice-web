import { MetaDefinition } from "@angular/platform-browser";

interface PageMetadata {
  title: string;
  tags:  MetaDefinition[];
}

// todo add images

export const META_DATA: {[key: string]: PageMetadata} = {
  home: {
    title: 'Sklenice a sítka na klíčení | zrzavaopice.cz',
    tags: [
      {name: 'keywords', content: 'klíčící sklenice, klíčící sítka, microgreens, klíčení, výhonky'},
      {name: 'robots', content: 'index, follow'},
      {name: 'description', content: 'E-shop plný klíčících sítek a sklenic.  Vše tisknuté na 3D tiskárně. Originální klíčící sítka, na kterých Vám naklíčí cokoliv. Sítka dostupná v mnoha barvách'},
      {name: 'og:type', content: 'website'},
      {name: 'og:url', content: 'https://www.zrzavaopice.cz'},
      {name: 'og:title', content: 'Sklenice a sítka na klíčení | zrzavaopice.cz'},
      // {name: 'og:image', content: 'src'},
      {name: 'og:description', content: 'E-shop plný klíčících sítek a sklenic.  Vše tisknuté na 3D tiskárně. Originální klíčící sítka, na kterých Vám naklíčí cokoliv. Sítka dostupná v mnoha barvách'}
    ]
  },
  eshop: {
    title: 'Eshop - Sklenice a sítka na klíčení | zrzavaopice.cz',
    tags: [
      {name: 'keywords', content: 'klíčící sklenice, klíčící sítka, microgreens, klíčení, výhonky'},
      {name: 'robots', content: 'index, follow'},
      {name: 'description', content: 'E-shop se sklenicemi a sítky na klíčení všech druhů semínek. Vše tisknuté na 3D tiskárně. Sítka dostupná v mnoha barvách'},
      {name: 'og:type', content: 'website'},
      {name: 'og:url', content: 'https://www.zrzavaopice.cz/eshop'},
      {name: 'og:title', content: 'Eshop - Sklenice a sítka na klíčení | zrzavaopice.cz'},
      // {name: 'og:image', content: 'src'},
      {name: 'og:description', content: 'E-shop se sklenicemi a sítky na klíčení všech druhů semínek. Vše tisknuté na 3D tiskárně. Sítka dostupná v mnoha barvách'}
    ]
  },
  restaurants: {
    title: 'Microgreens pro restaurace | zrzavaopice.cz',
    tags: [
      {name: 'keywords', content: 'microgreens, restaurace, klíčení, výhonky'},
      {name: 'robots', content: 'index, follow'},
      {name: 'description', content: 'Microgreens pro restaurace a kavárny. Pěstujeme na míru podle vašich požadavků.'},
      {name: 'og:type', content: 'website'},
      {name: 'og:url', content: 'https://www.zrzavaopice.cz/pro-restaurace'},
      {name: 'og:title', content: 'Microgreens pro restaurace | zrzavaopice.cz'},
      // {name: 'og:image', content: 'src'},
      {name: 'og:description', content: 'Microgreens pro restaurace a kavárny. Pěstujeme na míru podle vašich požadavků.'}
    ]
  },
  sklenice: {
    title: 'Sklenice na klíčení | zrzavaopice.cz',
    tags: [
      {name: 'keywords', content: 'klíčící sklenice, microgreens, klíčení, výhonky'},
      {name: 'robots', content: 'index, follow'},
      {name: 'description', content: 'Nakličte si semínka v našich sklenicích s víčky vytisknutými na 3D tiskárně. Sklenice jsou dostupné ve 2 velikostech a mnoha barvách'},
      {name: 'og:type', content: 'website'},
      {name: 'og:url', content: 'https://www.zrzavaopice.cz/sklenice'},
      {name: 'og:title', content: 'Sklenice na klíčení | zrzavaopice.cz'},
      // {name: 'og:image', content: 'src'},
      {name: 'og:description', content: 'Nakličte si semínka v našich sklenicích s víčky vytisknutými na 3D tiskárně. Sklenice jsou dostupné ve 2 velikostech a mnoha barvách'}
    ]
  },
  misky: {
    title: 'Sítka s miskou na klíčení | zrzavaopice.cz',
    tags: [
      {name: 'keywords', content: 'klíčící sítka, microgreens, klíčení, výhonky'},
      {name: 'robots', content: 'index, follow'},
      {name: 'description', content: 'Nakličte si semínka na našich sítcích vytisknutých na 3D tiskárně. Nabízíme sítka o různých tvarech a v mnoha barvách'},
      {name: 'og:type', content: 'website'},
      {name: 'og:url', content: 'https://www.zrzavaopice.cz/misky'},
      {name: 'og:title', content: 'Sítka s miskou na klíčení | zrzavaopice.cz'},
      // {name: 'og:image', content: 'src'},
      {name: 'og:description', content: 'Nakličte si semínka na našich sítcích vytisknutých na 3D tiskárně. Nabízíme sítka o různých tvarech a v mnoha barvách'}
    ]
  },

  navod: {
    title: 'Návod jak klíčit ve sklenici i na sítku | zrzavaopice.cz',
    tags: [
      {name: 'keywords', content: 'klíčící sklenice, klíčící sítka, microgreens, klíčení, výhonky'},
      {name: 'robots', content: 'index, follow'},
      {name: 'description', content: 'Nevíte, jak na klíčení v misce nebo sklenici? Připravili jsme pro Vás návod, podle kterého to zvládne každý.'},
      {name: 'og:type', content: 'website'},
      {name: 'og:url', content: 'https://www.zrzavaopice.cz/navod'},
      {name: 'og:title', content: 'Návod jak klíčit ve sklenici i na sítku | zrzavaopice.cz'},
      // {name: 'og:image', content: 'src'},
      {name: 'og:description', content: 'Nevíte, jak na klíčení v misce nebo sklenici? Připravili jsme pro Vás návod, podle kterého to zvládne každý.'}
    ]
  }


}
