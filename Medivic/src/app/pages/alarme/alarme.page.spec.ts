import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AlarmePage } from './alarme.page';

describe('AlarmePage', () => {
  let component: AlarmePage;
  let fixture: ComponentFixture<AlarmePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlarmePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
