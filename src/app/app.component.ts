import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, AsyncPipe],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {
  authService = inject(AuthService);
  elementRef = inject(ElementRef);

  isLoggedIn$!: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngAfterViewInit(): void {
    const navbar = this.elementRef.nativeElement.querySelector('nav');
    const navbarHeight = navbar.offsetHeight;

    document.documentElement.style.setProperty(
      '--navbar-height',
      `${navbarHeight}px`
    );
  }
}
