import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ContainerDirective } from '../../shared/directives/container.directive';
import { CheckboxComponent } from '../../shared/ui/checkbox/checkbox.component';
import { DialogComponent } from '../../shared/ui/dialog/dialog.component';
import { PopoverComponent } from '../../shared/ui/popover/popover.component';
import { SheetComponent } from '../../shared/ui/sheet/sheet.component';
import { TextareaComponent } from '../../shared/ui/textarea/textarea.component';
import { TitleComponent } from '../../shared/ui/title/title.component';

@Component({
  selector: 'app-root-page',
  standalone: true,
  imports: [
    ContainerDirective,
    TitleComponent,
    HeaderComponent,
    CheckboxComponent,
    DialogComponent,
    PopoverComponent,
    TextareaComponent,
    SheetComponent,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class RootPageComponent {
  isDialogOpen = false;
  isPopoverOpen = false;
  isSheetOpen = false;

  handleCloseDialog() {
    this.isDialogOpen = false;
  }
  openDialog() {
    this.isDialogOpen = true;
  }
  togglePopover() {
    this.isPopoverOpen = !this.isPopoverOpen;
  }
  openSheet() {
    this.isSheetOpen = true;
  }
  closeSheet() {
    this.isSheetOpen = false;
  }
}
