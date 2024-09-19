import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EshopAdminHeaderComponent } from './header.component';

describe('EshopAdminHeaderComponent', () => {
  let component: EshopAdminHeaderComponent;
  let fixture: ComponentFixture<EshopAdminHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EshopAdminHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EshopAdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
