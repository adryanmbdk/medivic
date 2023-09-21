import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CadastroRemedioPage } from './cadastro-remedio.page';

describe('CadastroRemedioPage', () => {
  let component: CadastroRemedioPage;
  let fixture: ComponentFixture<CadastroRemedioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CadastroRemedioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
