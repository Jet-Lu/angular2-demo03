/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Page32Component } from './page32.component';

describe('Page32Component', () => {
  let component: Page32Component;
  let fixture: ComponentFixture<Page32Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page32Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
