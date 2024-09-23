import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category.interface';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  categoriesService = inject(CategoriesService);

  categories: Category[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  async getCategories(): Promise<void> {
    this.categories = await this.categoriesService.getCategories();
  }
}
