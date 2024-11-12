import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
  private tagsSubscription!: Subscription;
  tags: Tag[] = [];
  showDropdown = false;

  ngOnInit(): void {
    this.tagsSubscription = this.tagsService.getAllTags().subscribe((data) => {
      this.tags = data;
    });
  }

  toggleDropdown(state: boolean) {
    this.showDropdown = state;
  }

  ngOnDestroy(): void {
    this.tagsSubscription.unsubscribe();
  }
}
