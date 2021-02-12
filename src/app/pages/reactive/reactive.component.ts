import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})

export class ReactiveComponent implements OnInit {

  form: FormGroup;

  /**
  * FormBuilder es un servicio, que contiene,
  * metodos para crear formularios facilmente.
  */

  constructor(private fb: FormBuilder, private valServices: ValidatorsService) { 
    // Ejecutamos la funcion createFrom()
    this.createForm();

    // Cargar data
    this.loadData();
  }

  ngOnInit(): void {
  }

  /**
  * Get en un clase es una forma
  * de obtener una propidad en particular.
  */
  get nameInvalid() {
    return this.form.get('name').invalid && this.form.get('name').touched;
  }

  get lastnameInvalid() {
    return this.form.get('lastname').invalid && this.form.get('lastname').touched;
  }

  get emailInvalid() {
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  get districtInvalid() {
    return this.form.get('address.district').invalid && this.form.get('address.district').touched;
  }

  get cityInvalid() {
    return this.form.get('address.city').invalid && this.form.get('address.city').touched;
  }

  get hobbies() {
    return this.form.get('hobbies') as FormArray;
  }

  // Validar contraseñas.
  get passwordNoValid() {
    return this.form.get('password').invalid && this.form.get('password').touched;
  }

  get confirmPassword() {
    const password = this.form.get('password').value;
    const cpassword = this.form.get('cpassword').value;

    return (password === cpassword) ? false : true;
  }

  /**
  * Creamos el formulareio Reactivo.
  * Utilizamos el FormGroup para inicializarlo dentro de la función
  * createFrom();
  */
  createForm() {
    // Definimos el formulario con FormBuilder.
    this.form = this.fb.group({
      /**
      * Sintaxis del objeto de FB.
      * name: ['value', Validadores Sincrono, Validadores Asincronos]
      */
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, this.valServices.noHerrera]],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      cpassword: ['', [Validators.required, Validators.minLength(5)]],
      address: this.fb.group({
        district: ['', Validators.required],
        city: ['', Validators.required],
      }),
      hobbies: this.fb.array([])
    }, {
      validators: this.valServices.passwordEquals('password', 'cpassword')
    });

  }

  // Cargamos la información al form.
  loadData() {
    this.form.reset({
      "name": "Angular",
      "lastname": "Forms",
      "email": "forms@angular.com",
      "address": {
        "district": "CDMX",
        "city": "Ciudad de México"
      }
    });
  }

  // Agregar nuevo hobby
  addHobby() {
    this.hobbies.push(this.fb.control(''));
  }

  // Borrar hobby 
  deleteHobby(i: number) {
    this.hobbies.removeAt(i);
  }

  // Guardamos el form.
  save() {
    console.log(this.form);

    // Verificar si el from ha sido valido.
    if(this.form.invalid) {
      // Si el form es invalido, se le marcar como Touched los campos que no esten validos.
      return Object.values(this.form.controls).forEach( ctrl => {
        
        if(ctrl instanceof FormGroup) {
          Object.values(ctrl.controls).forEach( ctrl => ctrl.markAsTouched());
        } else {
          // Se marca como touched el campo invalido.
          ctrl.markAsTouched();         
        }
      });
    }

    // Despues del posteo de la información, se vacia el form.
    this.form.reset({
      "name": 'Sin nombre'
    });
  }

}
