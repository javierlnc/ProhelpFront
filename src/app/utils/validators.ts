import { FormGroup } from "@angular/forms";
export const isRequiredLogin = (field: 'username' | 'password', form: FormGroup)=>{
    const control = form.get(field);
    return control && control.touched && control.hasError('required')
};
export const isRequired = (field: 'name' | 'description', form: FormGroup)=>{
    const control = form.get(field);
    return control && control.touched && control.hasError('required')
};