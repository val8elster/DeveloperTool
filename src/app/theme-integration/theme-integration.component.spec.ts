import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeIntegrationComponent } from './theme-integration.component';

describe('ThemeIntegrationComponent', () => {
  let component: ThemeIntegrationComponent;
  let fixture: ComponentFixture<ThemeIntegrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeIntegrationComponent]
    });
    fixture = TestBed.createComponent(ThemeIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
