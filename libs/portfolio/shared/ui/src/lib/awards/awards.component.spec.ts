import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioAwardsComponent } from './awards.component';

describe('PortfolioAwardsComponent', () => {
  let component: PortfolioAwardsComponent;
  let fixture: ComponentFixture<PortfolioAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAwardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
