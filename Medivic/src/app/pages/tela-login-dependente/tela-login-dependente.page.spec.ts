import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaLoginDependentePage } from './tela-login-dependente.page';

describe('TelaLoginDependentePage', () => {
  let component: TelaLoginDependentePage;
  let fixture: ComponentFixture<TelaLoginDependentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TelaLoginDependentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
