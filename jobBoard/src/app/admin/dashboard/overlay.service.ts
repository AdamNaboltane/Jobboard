import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  closeOverlay = new Subject();

  constructor() {}
}
