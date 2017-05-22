/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Page31Component } from './page31.component';

describe('Page31Component', () => {
  let component: Page31Component;
  let fixture: ComponentFixture<Page31Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page31Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
