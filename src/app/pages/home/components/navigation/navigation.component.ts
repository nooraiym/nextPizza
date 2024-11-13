import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private tagsSubscription!: Subscription;
  tags: Tag[] = [];
  selectedTag!: Tag;
  showDropdown = false;

  ngOnInit() {
    this.tagsSubscription = this.tagsService.getAllTags().subscribe((data) => {
      this.tags = data;
      this.selectedTag = this.tags[0];
    });
  }

  toggleDropdown(state: boolean) {
    this.showDropdown = state;
  }
  selectTag(tag: Tag) {
    this.router.navigate([''], { queryParams: { tag: tag.queryName }});
    this.selectedTag = tag;
  }

  ngOnDestroy() {
    this.tagsSubscription.unsubscribe();
  }
}
