// Angular modules
import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

// External modules
import { TranslateModule } from '@ngx-translate/core';

// Services
import { AppService } from '@services/app.service';
import { StoreService } from '@services/store.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, RouterLink, TranslateModule]
})
export class ForgotPasswordComponent {
  public formGroup!: FormGroup<{ email: FormControl<string> }>;

  constructor(
    public router: Router,
    private storeService: StoreService,
    private appService: AppService,
  ) {
    this.initFormGroup();
  }

  // -------------------------------------------------------------------------------
  // NOTE Init ---------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  private initFormGroup(): void {
    this.formGroup = new FormGroup({
      email: new FormControl<string>({
        value: '',
        disabled: false
      }, { validators: [Validators.required, Validators.email], nonNullable: true }),
    });
  }

  // -------------------------------------------------------------------------------
  // NOTE Actions ------------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public async onClickSubmit(): Promise<void> {
    await this.forgotPassword();
  }

  // -------------------------------------------------------------------------------
  // NOTE Requests -----------------------------------------------------------------
  // -------------------------------------------------------------------------------

  private async forgotPassword(): Promise<void> {
    this.storeService.isLoading.set(true);

    const email = this.formGroup.controls.email.getRawValue();
    const success = await this.appService.forgotPassword(email);

    this.storeService.isLoading.set(false);

    if (!success)
      return;

    // NOTE Redirect to validate account
    this.router.navigate(['/auth/validate-account']);
  }

  // -------------------------------------------------------------------------------
  // NOTE Helpers ------------------------------------------------------------------
  // -------------------------------------------------------------------------------
}
