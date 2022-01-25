import {
  Component,
  Injectable,
  Input,
  NgModule,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {
  MatProgressSpinnerModule,
  MatSpinner,
} from '@angular/material/progress-spinner';

@Injectable()
export class MyCustomPaginator implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`Trang đầu`;
  itemsPerPageLabel = $localize`Số sản phẩm mỗi trang:`;
  lastPageLabel = $localize`Trang cuối`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Trang kế';
  previousPageLabel = 'Trang trước';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Trang 1 của 1 trang`;
    } else {
      const amountPages = Math.ceil(length / pageSize);
      return $localize`Trang ${page + 1} của ${amountPages} trang`;
    }
  }
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  @Input()
  length!: number;
  @Input()
  pageSize!: number;
  pageSizeOptions: number[] = [3, 6, 9, 12];
  pageChange!: number;
  @Output()
  pageEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  handleChange($event: any) {
    console.log($event);
    this.pageEvent.emit($event);
  }
}
const materialModule = [
  MatPaginatorModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSliderModule,
  MatSelectModule,
  MatIconModule,
  MatDialogModule,
  MatBadgeModule,
  MatMenuModule,
  MatButtonModule,
  MatTableModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatProgressSpinnerModule,
];
@NgModule({
  imports: materialModule,
  exports: materialModule,
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginator }],
})
export class MaterialModule {}
