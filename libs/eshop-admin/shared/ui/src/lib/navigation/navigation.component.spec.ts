import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EshopAdminNavigationComponent } from './navigation.component';

describe('EshopAdminSidebarComponent', () => {
  let component: EshopAdminNavigationComponent;
  let fixture: ComponentFixture<EshopAdminNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EshopAdminNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EshopAdminNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
