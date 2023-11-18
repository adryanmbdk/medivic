import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DependentesPage } from './dependentes.page';

describe('DependentesPage', () => {
  let component: DependentesPage;
  let fixture: ComponentFixture<DependentesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DependentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
