import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  firstLastNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  constructor() {}

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
