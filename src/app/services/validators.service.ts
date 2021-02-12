import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean 
}


@Injectable({
  providedIn: 'root'
})

export class ValidatorsService {

  constructor() { 
  }

  // Verificar existencia de usuario.
  existUser(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    if(!control.value) {
      return Promise.resolve(null);
    }

    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'demo') {
          resolve({ find: true });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }

  noHerrera(control: FormControl): ErrorValidate {
    
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
