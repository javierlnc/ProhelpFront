import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

// Función genérica para validar si un campo es requerido
export const isFieldRequired = (field: string, form: FormGroup): boolean => {
    const control = form.get(field);
    return !!(control && control.touched && control.hasError('required'));
};

// Validador de coincidencia de contraseñas
export const passwordsMatchValidator = (password: string, confirmPassword: string): ValidatorFn => {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
        const passwordControl = formGroup.get(password);
        const confirmPasswordControl = formGroup.get(confirmPassword);

        if (!passwordControl || !confirmPasswordControl) return null;

        return passwordControl.value === confirmPasswordControl.value ? null : { passwordsMismatch: true };
    };
};
