import { Observable } from 'rxjs';
import { BrandService } from './../../Services/_brand-service/brand.service';
import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'src/app/_models';

@Component({
  selector: 'app-member-card-list',
  templateUrl: './member-card-list.component.html',
  styleUrls: ['./member-card-list.component.scss'],
})
export class MemberCardListComponent implements OnInit {
  brandRes$!: Observable<Brand[]>;
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brandRes$ = this.brandService.findAll();
  }
}
