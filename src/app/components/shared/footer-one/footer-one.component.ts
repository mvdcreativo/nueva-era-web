import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {
  form : FormGroup;

  constructor(
    private fb:FormBuilder,
    private messageService : MessageService
  ) { }


  ngOnInit() {
    this.form = this.fb.group({
      name:[null, Validators.required],
      phone:[null, Validators.required],
      email:[null, [Validators.required,Validators.email]],
      message:[null, [Validators.required,Validators.minLength(3)]]
    })
  }

onSubmit(){
  this.messageService.sendMessage(this.form.value)
  this.form.reset();
}


}
