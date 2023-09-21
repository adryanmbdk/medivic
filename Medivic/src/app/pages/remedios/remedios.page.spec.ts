import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RemediosPage } from './remedios.page';

describe('RemediosPage', () => {
  let component: RemediosPage;
  let fixture: ComponentFixture<RemediosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RemediosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
