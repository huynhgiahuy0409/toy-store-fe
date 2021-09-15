import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-box',
  templateUrl: './title-box.component.html',
  styleUrls: ['./title-box.component.scss'],
})
export class TitleBoxComponent implements OnInit {
  @Input()
  title!: string;
  @Input()
  titleBoxImage!: string;
  constructor() {}
  ngOnInit(): void {
  }
}
