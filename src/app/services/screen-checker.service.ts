import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ScreenCheckerService {
  private resizeSource = new Subject<null>();
  public resize = this.resizeSource.asObservable();
  brakePoint = 767;
  screenWidth!: number;

  constructor() {
    this.screenWidth = window.innerWidth;
    window.addEventListener('resize', (event) => this.onResize(event));
  }

  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    
    this.resize.subscribe((event:any) => {
      this.screenWidth = event!.target.innerWidth;
    });
    return this.isSmall()
  }
  
  isSmall(): boolean{
    return this.screenWidth <= this.brakePoint;
  }

}
