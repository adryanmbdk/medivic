import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroDependentePage } from './cadastro-dependente.page';

describe('CadastroDependentePage', () => {
  let component: CadastroDependentePage;
  let fixture: ComponentFixture<CadastroDependentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastroDependentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
