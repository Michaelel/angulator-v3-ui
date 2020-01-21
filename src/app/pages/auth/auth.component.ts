import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {GeneralDataService} from '../../services/general-data.service';
import {Router} from '@angular/router';
import {RoutesEnum} from '../../shared/enums/routes.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit, OnDestroy {

  emailCtrl = this.fb.control(this.dataService.email || '', [Validators.email, Validators.required])

  constructor(
    private fb: FormBuilder,
    private dataService: GeneralDataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.dataService.routeAfterAuth = null;
  }

  back(): void {
    this.router.navigate([ RoutesEnum.Menu ]);
  }

  save(): void {
    this.dataService.setEmail(this.emailCtrl.value);
    this.router.navigate([this.dataService.routeAfterAuth || RoutesEnum.Menu ]);
  }

}
