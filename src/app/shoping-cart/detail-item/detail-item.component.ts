import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pendingOrdersSelection } from 'src/app/core/store/pending-order-items';
import { PendingOrderItem } from 'src/app/_models';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: [
    '../template/css/style.css',
    '../template/css/custom.css',
    '../template/css/responsive.css',
    '../template/css/bootstrap.min.css',
  ],
})
export class DetailItemComponent implements OnInit {
  pendingOrder!: PendingOrderItem
  constructor(private store: Store) {
    this.store.select(pendingOrdersSelection)
  }
  ngOnInit(): void {
  }
}
