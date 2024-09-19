import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EshopAdminSidebarComponent } from './sidebar.component';

describe('EshopAdminSidebarComponent', () => {
  let component: EshopAdminSidebarComponent;
  let fixture: ComponentFixture<EshopAdminSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EshopAdminSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EshopAdminSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
