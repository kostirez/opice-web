import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Picture } from "../../model/view";
import { Router } from "@angular/router";
import { ImageService } from "../../image.service";


interface Slide {
  title?: string;
  content?: string | string[];
  image?: Picture;
}

export interface Article {
  backgroundImage: Picture;
  slides: Slide[];
  similar: {
    name: string,
    url: string,
  }[]
}

@Component({
  selector: 'app-dynamic-article',
  templateUrl: './dynamic-article.component.html',
  styleUrl: './dynamic-article.component.scss'
})
export class DynamicArticleComponent implements AfterViewInit {
  @Input() article!: Article;
  currentSlideIndex = 0;

  @ViewChild('scrollableContainer') scrollableContainer!: ElementRef;

  constructor(
    private router: Router,
    private imageService: ImageService,
  ) {}

  ngAfterViewInit(): void {
    const fadeInElements = this.scrollableContainer.nativeElement.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, {
      root: this.scrollableContainer.nativeElement, // Set the scrollable container as the root
      threshold: 0.1 // Trigger when 10% of the element is visible within the container
    });

    fadeInElements.forEach((el: Element) => observer.observe(el));
  }

  isArray(content: string | string[]) {
    return Array.isArray(content)
  }

  goToArticle(articleId: string) {
    this.router.navigate(['/blog'], { queryParams: { article: articleId}});
  }

  getBackground(): string {
    return this.getImage(this.article.backgroundImage);
  }

  getImage(image: Picture): string {
    let url = '';
    if (image) {
      url += this.imageService.getImageBase();
      url += image.url;
    }
    return url
  }
}
