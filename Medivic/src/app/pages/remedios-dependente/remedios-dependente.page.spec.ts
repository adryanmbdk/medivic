import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemediosDependentePage } from './remedios-dependente.page';

describe('RemediosDependentePage', () => {
  let component: RemediosDependentePage;
  let fixture: ComponentFixture<RemediosDependentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RemediosDependentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
