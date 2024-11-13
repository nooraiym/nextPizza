import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'newest-filtering',
  standalone: true,
  imports: [],
  templateUrl: './newest-filtering.component.html',
  styleUrl: './newest-filtering.component.scss',
})
export class NewestFilteringComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isNewOnly: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isNewOnly = params['isNewOnly'] === 'true';
    });
  }

  toggleNewFilter(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.isNewOnly = checkbox.checked;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { isNewOnly: this.isNewOnly ? this.isNewOnly : null },
      queryParamsHandling: 'merge',
    });
  }
}
