import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';
import { SkeletonTableComponent } from './components/skeleton-table/skeleton-table.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
//modulo de shared, para principalmente ng-zorro
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    SkeletonTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzTableModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzSkeletonModule,
    NzInputModule,
    NzFormModule,
    NzDropDownModule,
    NzAlertModule,
    NzNotificationModule,
    FormsModule,
    ReactiveFormsModule,
    NzMessageModule,
    NzSpinModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzTableModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzSkeletonModule,
    NzInputModule,
    NzFormModule,
    NzDropDownModule,
    NzAlertModule,
    SkeletonTableComponent,
    NzMessageModule,
    NzSpinModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
})
export class SharedModule {}
