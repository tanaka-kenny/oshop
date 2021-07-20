import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oshop';

  constructor(
    private auth: AuthService,
    private userService: UserService) {
      auth.user$.subscribe(user => {
        if (user) {
          userService.save(user);
        }
      })
    }

}
