import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }


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
