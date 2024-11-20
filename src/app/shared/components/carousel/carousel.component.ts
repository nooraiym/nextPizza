import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
  X,
} from 'lucide-angular';
import { stories } from '../../../../assets/images/stories/stories';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  readonly X = X;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly DISPLAY_TIME = 3000;
  stories = stories;
  isModalOpen = false;
  currentStoryIndex = 0;
  currentImageIndex = 0;
  timetickerBars: number[] = [];
  timerInterval: any;
  progress = 0;

  ngOnInit(): void {}

  handleOpenModal(index: number): void {
    this.isModalOpen = true;
    this.currentStoryIndex = index;
    this.currentImageIndex = 0;
    this.initializeTimeticker();
    this.startTimer();
  }
  handleCloseModal(): void {
    this.isModalOpen = false;
    this.clearTimer();
    this.resetTimeticker();
  }
  initializeTimeticker(): void {
    this.timetickerBars = Array(
      this.stories[this.currentStoryIndex].images.length
    ).fill(0);
  }
  resetTimeticker(): void {
    this.timetickerBars = [];
    this.progress = 0;
  }
  startTimer(): void {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      this.progress += 100 / (this.DISPLAY_TIME / 100);
      this.timetickerBars[this.currentImageIndex] = this.progress;

      if (this.progress >= 100) {
        this.nextImage();
      }
    }, 100);
  }
  clearTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.progress = 0;
  }
  nextImage(): void {
    const currentStory = this.stories[this.currentStoryIndex];

    if (this.currentImageIndex < currentStory.images.length - 1) {
      this.currentImageIndex++;
      this.progress = 0;
    } else {
      this.nextStory();
    }
  }
  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.progress = 0; // Сбрасываем прогресс на предыдущем изображении
    } else {
      this.prevStory();
    }
  }
  nextStory(): void {
    if (this.currentStoryIndex < this.stories.length - 1) {
      this.currentStoryIndex++;
    } else {
      this.currentStoryIndex = 0;
    }

    this.currentImageIndex = 0;
    this.initializeTimeticker();
    this.startTimer();
  }
  prevStory(): void {
    if (this.currentStoryIndex > 0) {
      this.currentStoryIndex--;
    } else {
      this.currentStoryIndex = this.stories.length - 1;
    }

    this.currentImageIndex = 0;
    this.initializeTimeticker();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
