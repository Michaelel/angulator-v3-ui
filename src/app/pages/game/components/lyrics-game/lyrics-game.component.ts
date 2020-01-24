import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  @ViewChild('sourceInput', { static: false }) sourceInput: ElementRef;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    setTimeout(() => this.sourceInput.nativeElement.focus(), 100);
    this.formLink.setParent(this.lyricsForm);
  }

  find(): void {
    this.findEmitter.emit();
  }

  get sourceCtrl(): AbstractControl {
    return this.lyricsForm.get('source');
  }

}
