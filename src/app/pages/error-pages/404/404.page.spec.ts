import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Page404 } from './404.page';

describe('404Page', () => {
  let component: Page404;
  let fixture: ComponentFixture<Page404>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Page404);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
