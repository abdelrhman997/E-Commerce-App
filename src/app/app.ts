import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Products } from './components/products/products';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header,Products,Footer],
  templateUrl: 'components/app/app.html',
  styleUrl: 'components/app/app.css'
})
export class App {
  protected readonly title = signal('ecommerce');
}
