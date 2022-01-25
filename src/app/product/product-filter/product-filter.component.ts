import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { BrandService, ProductService } from 'src/app/Services';
import { AgeService } from 'src/app/Services/_age-service/age.service';
import { UseObjectService } from 'src/app/Services/_use-object-service/use-object.service';
import { Age, Brand, ProductFilter, UseObject } from 'src/app/_models';
import { debounceTime, delay, startWith, switchMap, tap } from 'rxjs/operators';
interface DefaultSltOption {
  [key: string]: boolean;
}

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['../product.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  searchValue!: string;
  ages$!: Observable<Age[]>;
  brands$!: Observable<Brand[]>;
  useObjects$!: Observable<UseObject[]>;
  ageSelectFG!: FormGroup;
  productFilter: ProductFilter = this.productService.initialFilter;
  defaultAgeRangeSlt: DefaultSltOption = {};
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private ageService: AgeService,
    private useObjectService: UseObjectService,
    private fb: FormBuilder
  ) {
    this.ageSelectFG = this.fb.group(this.defaultAgeRangeSlt);
  }

  ngOnInit(): void {
    let ageIdArr: number[];
    this.brands$ = this.brandService.findAll();
    this.useObjects$ = this.useObjectService.findAll();
    this.ages$ = this.ageService.findAll().pipe(
      tap((ages) => {
        ageIdArr = ages.map((age) => age.id);
        const ageSltStatusMap = new Map(ages.map((age) => [age.id, false]));
        this.defaultAgeRangeSlt = (<any>Object).fromEntries(ageSltStatusMap);
      })
    );
    /* Next a new value if FG has a change */
    combineLatest([
      this.ages$,
      this.ageSelectFG.valueChanges.pipe(startWith(this.defaultAgeRangeSlt)),
    ]).pipe(
      tap(([v1, v2]) => {
        /* this.ageSelectFG = this.fb.group(this.defaultAgeRangeSlt); */
        console.log(v1);
        console.log(v2);
      })
    );
    /* this.ageSelectFG.valueChanges
      .pipe(
        debounceTime(1000),
        tap(
          (rs) => {
            console.log(rs);
            const sltAge = ageIdArr.filter((ageId) => rs[ageId]);
            this.productFilter.ageRangeIds = sltAge;
            this.productService.filterProductBSub.next(this.productFilter);
          },
          switchMap(() =>
            this.ageSelectFG.valueChanges.pipe(
              startWith({ 1: true, 2: false, 3: false, 4: false })
            )
          )
        )
      )
      .subscribe(); */
  }
  search() {
    this.productService.searchProductsByName(this.searchValue).subscribe();
  }

  genderChange($event: any) {
    let genderId: number = $event.value;
    this.productFilter.useObjectId = genderId;
    this.productService.filterProductBSub.next(this.productFilter);
  }
  brandChange($event: any) {
    let brandId: number = $event.value;
    this.productFilter.brandId = brandId;
    this.productService.filterProductBSub.next(this.productFilter);
  }
  priceRangeChange($event: any) {
    console.log($event);
    let valueChoose = $event.value;
    this.productFilter.priceRange = [0, valueChoose];
    this.productService.filterProductBSub.next(this.productFilter);
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
}
