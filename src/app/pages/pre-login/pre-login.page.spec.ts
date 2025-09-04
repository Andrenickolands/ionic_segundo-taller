import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreLoginPage } from './pre-login.page';

describe('PreLoginPage', () => {
  let component: PreLoginPage;
  let fixture: ComponentFixture<PreLoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
