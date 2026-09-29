import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  // Email en minúsculas con dominio de 2 a 4 letras.
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  // Un nombre o apellido: letras (con tildes y ñ), espacios, apóstrofo y guion.
  namePattern: string = "^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$";
  constructor() {}

  // Validador de grupo: error `notEquals` si los dos campos no coinciden
  // (ej. contraseña y confirmación). Se aplica al FormGroup, no a un control.
  equalsFields(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (formGroup.get(field1)?.value !== formGroup.get(field2)?.value) {
        return {
          notEquals: true,
        };
      }
      return null;
    };
  }
}
