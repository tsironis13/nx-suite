import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioTechStackComponent } from './tech-stack.component';

describe('PortfolioTechStackComponent', () => {
  let component: PortfolioTechStackComponent;
  let fixture: ComponentFixture<PortfolioTechStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioTechStackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioTechStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
