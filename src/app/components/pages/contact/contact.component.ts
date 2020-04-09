import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { SeoService } from 'src/app/seo/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private seoService: SeoService
    ) { 
      this.setSeo()
    }

  setSeo(dataProduct?) {
    //////seo/////
    // console.log(dataProduct);
    

    this.seoService.genrateTags({

      title: `Nueva Era Uruguay | Contacto`,
      description: `Contáctanos - Dirección: Bv. José Batlle y Ordóñez 3171, Montevideo, Teléfonos: (+598) 2481 0610 o al (+598) 092 843 843, Correo Eletrónico: veterinarianuevaera@gmail.com`,
      slug: `pages/contacto`,



    })
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      message: [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  onSubmit() {
    this.messageService.sendMessage(this.form.value)
    this.form.reset();
  }
}
