import { Component, Input } from '@angular/core';

@Component({
  selector: 'iopm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {

  @Input() type: string;
  @Input() placeholder: string;
  @Input() color: string;
  @Input() formControlName: string = null;
  @Input() autofocus: string = null;

  constructor() { }
  
}
