import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioExperienceComponent } from './experience.component';

describe('PortfolioExperienceComponent', () => {
  let component: PortfolioExperienceComponent;
  let fixture: ComponentFixture<PortfolioExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
