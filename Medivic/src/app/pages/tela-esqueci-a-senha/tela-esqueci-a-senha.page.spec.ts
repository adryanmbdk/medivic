import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TelaEsqueciASenhaPage } from './tela-esqueci-a-senha.page';

describe('TelaEsqueciASenhaPage', () => {
  let component: TelaEsqueciASenhaPage;
  let fixture: ComponentFixture<TelaEsqueciASenhaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TelaEsqueciASenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
