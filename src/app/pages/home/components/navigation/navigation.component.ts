import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { Tag } from '../../../../shared/services/tags/tags.model';
import { TagsService } from '../../../../shared/services/tags/tags.service';
import { DropdownTagsComponent } from './dropdown-tags/dropdown-tags.component';

@Component({
  selector: 'navigation',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, DropdownTagsComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  readonly ChevronDown = ChevronDown;
  private tagsService = inject(TagsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private tagsSubscription!: Subscription;
  tags: Tag[] = [];
  selectedTag!: Tag;
  showDropdown = false;

  ngOnInit() {
    this.tagsSubscription = this.tagsService.getAllTags().subscribe((data) => {
      this.tags = data;
      const tagName = this.route.snapshot.queryParamMap.get('tag');

      if (tagName) {
        this.selectedTag =
          this.tags.find((tag) => tag.queryName === tagName) || this.tags[0];
      } else {
        this.selectedTag = this.tags[0];
      }
    });
  }

  toggleDropdown(state: boolean) {
    this.showDropdown = state;
  }
  selectTag(tag: Tag) {
    this.router.navigate([''], {
      queryParams: { tag: tag.queryName },
      queryParamsHandling: 'merge',
    });
    this.selectedTag = tag;
  }

  ngOnDestroy() {
    this.tagsSubscription.unsubscribe();
  }
}
