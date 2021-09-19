import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { BrandService, ProductService } from 'src/app/Services';
import { AgeService } from 'src/app/Services/_age-service/age.service';
import { UseObjectService } from 'src/app/Services/_use-object-service/use-object.service';
import { Age, Brand, ProductFilter, UseObject} from 'src/app/_models';
import { delay, startWith, tap } from 'rxjs/operators';
interface DefaultSltOption {
  [key: number]: boolean
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
  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private ageService: AgeService,
    private useObjectService: UseObjectService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let ageSltArr: number[];
    let defaultAgeRangeSlt: DefaultSltOption = {};
    this.brands$ = this.brandService.findAll();
    this.useObjects$ = this.useObjectService.findAll()
    /* Setup age FormGroup */
    this.ages$ = this.ageService.findAll().pipe(
      tap((ages) => {
        ageSltArr = ages.map((age) => age.id);
        const ageSltStatusMap = new Map(ages.map((age) => [age.id, false]));
        defaultAgeRangeSlt = (<any>Object).fromEntries(ageSltStatusMap);
        this.ageSelectFG = this.fb.group(defaultAgeRangeSlt);
      })
    );

    /* Next a new value if FG has a change */
    setTimeout(() => {
      this.ageSelectFG.valueChanges.subscribe((rs) => {
        const sltAge = ageSltArr.filter((ageId) => rs[ageId + '']);
        this.productFilter.ageRangeIds = sltAge;
        this.productService.filterBSub.next(this.productFilter);
      });
    }, 1000);
  }
  search() {
    this.productService
      .searchProductsByName(this.searchValue)
      .subscribe((products) => {
      });
  }

  genderChange($event: any){
    let genderId: number = $event.value;
    this.productFilter.useObjectId = genderId;
    this.productService.filterBSub.next(this.productFilter);
  }
  brandChange($event: any){
    let brandId: number = $event.value;
    this.productFilter.brandId = brandId;
    this.productService.filterBSub.next(this.productFilter);
  }
  priceRangeChange($event: any){
    console.log($event);
    let valueChoose = $event.value;
    this.productFilter.priceRange = [0, valueChoose];
    this.productService.filterBSub.next(this.productFilter);
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
}
