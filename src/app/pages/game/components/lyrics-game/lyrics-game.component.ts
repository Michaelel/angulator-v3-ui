import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-lyrics-game',
  templateUrl: './lyrics-game.component.html',
  styleUrls: ['./lyrics-game.component.sass'],
})
export class LyricsGameComponent implements OnInit {

  lyricsForm = this.fb.group({
    source: [ '', [ Validators.required, Validators.minLength(5) ] ],
  });

  @Input() formLink: FormGroup;
  @Output('findEmitter') findEmitter = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formLink.setParent(this.lyricsForm);
  }

  find(): void {
    this.findEmitter.emit();
  }

  get sourceCtrl(): AbstractControl {
    return this.lyricsForm.get('source');
  }

}
