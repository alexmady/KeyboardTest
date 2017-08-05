import {Directive, ElementRef, Renderer, AfterViewInit} from "@angular/core";

@Directive({
  selector: '[keyboardFix]'
})

export class keyboardFix implements AfterViewInit {

  constructor (private _elRef: ElementRef, private _renderer: Renderer) {}

  ngAfterViewInit() {

    let input = null;

    if( this._elRef.nativeElement.tagName === 'ION-TEXTAREA') {
        input = this._elRef.nativeElement.querySelector("textarea");
    } else {
        input = this._elRef.nativeElement.querySelector("input");
    } 

    if( input ) {
        this._renderer.setElementAttribute(input, 'autoComplete', 'on');
        this._renderer.setElementAttribute(input, 'spellcheck', 'on');
        this._renderer.setElementAttribute(input, 'autocorrect', 'on');
    }   
 
  }

}
