import {Component, Input, OnInit} from '@angular/core';
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
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formLink.setParent(this.lyricsForm);
  }

  get sourceCtrl(): AbstractControl {
    return this.lyricsForm.get('source');
  }

}
