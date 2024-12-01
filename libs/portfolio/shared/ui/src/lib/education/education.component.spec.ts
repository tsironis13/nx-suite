import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioEducationComponent } from './education.component';

describe('PortfolioEducationComponent', () => {
  let component: PortfolioEducationComponent;
  let fixture: ComponentFixture<PortfolioEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioEducationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
