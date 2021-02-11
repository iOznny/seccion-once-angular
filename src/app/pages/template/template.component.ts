import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit {

  user = {
    name: 'Angular',
    latname: 'Demos',
    email: 'angular@demo.com',
    country: 'MEX',
    gender: 'male'
  }

  countries: any[] = [];

  constructor(private countrysService: CountryService) {
  }

  ngOnInit(): void {
    /*
    * Obtenemos todos los paises de la API Rest Countries.
    * https://restcountries.eu/rest/v2/lang/es
    */
    this.countrysService.getCountrys().subscribe( countries => {
      // Asignamos los paises al array que mostrara los paises.
      this.countries = countries;
      
      // Agregar un nuevo elemento en la primera pocisión.
      this.countries.unshift({
        name: 'Seleccione un país',
        code: ''
      })

    });
  }

  save(form: NgForm) {

    // Verificar si el from ha sido valido.
    if(form.invalid) {
      // Si el form es invalido, se le marcar como Touched los campos que no esten validos.
      Object.values(form.controls).forEach( ctrl => {
        // Se marca como touched el campo invalido.
        ctrl.markAsTouched();        
      });

      return;
    }

    console.log(form);
    console.log(form.value);
  }

}
