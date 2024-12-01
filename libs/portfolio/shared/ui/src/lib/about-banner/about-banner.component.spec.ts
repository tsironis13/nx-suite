import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioAboutBannerComponent } from './about-banner.component';

describe('PortfolioAboutBannerComponent', () => {
  let component: PortfolioAboutBannerComponent;
  let fixture: ComponentFixture<PortfolioAboutBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAboutBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioAboutBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
