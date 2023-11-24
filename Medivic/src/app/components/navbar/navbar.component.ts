import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface SideNavToggle {
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule,IonicModule],
  standalone: true
})
export class NavbarComponent  implements OnInit {

  public navData = [
    { routeLink: 'medicamentos', icon: 'medkit', label: 'Medicamentos'}
]
  constructor() { }

  ngOnInit() {}

}
