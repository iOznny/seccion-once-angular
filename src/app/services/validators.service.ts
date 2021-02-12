import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {

  constructor() { 
  }

  noHerrera(control: FormControl): { [s: string]: boolean } {
    
    if(control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true
      }
    }
    
    return null;
  }

  // Compara las contraseñas
  passwordEquals(password: string, cpassword: string) {
    return ( formGroup: FormGroup ) => {
      const pass1 = formGroup.controls[password];
      const pass2 = formGroup.controls[cpassword];

      if(pass1.value == pass2.value) {
        pass2.setErrors(null);
      } else {
        pass2.setErrors({ noEqual: true });
      }
    }
  }

}
