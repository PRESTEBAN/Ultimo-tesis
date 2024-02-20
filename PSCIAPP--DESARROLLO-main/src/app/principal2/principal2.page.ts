import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal2',
  templateUrl: './principal2.page.html',
  styleUrls: ['./principal2.page.scss'],
})
export class Principal2Page implements OnInit {

  constructor(private route: ActivatedRoute,  private userService: UserService, private router: Router) { }

  nombreUsuarioCorreo: string = '';

  ngOnInit() {
    const userId = this.userService.getUserId();
    if (userId) {
      this.userService.getUserNameFromDatabase(userId).then(name => {
        this.nombreUsuarioCorreo = name;
      });
    } else {
      this.nombreUsuarioCorreo = 'Invitado'; // Si no se encuentra el ID de usuario, establece el nombre como 'Invitado'
    }
  }

  irChat(){
    this.router.navigate(['/chat']);
  }

  irPrincipal(){
    this.router.navigate(['/Principal2']);
  }

  logout() {
    const userId = this.userService.getUserId();
    if (userId !== undefined) {
      // Limpiar los mensajes al cerrar sesión
      const userMessagesRef = this.userService.getUserMessagesRef(userId);
  
      if (userMessagesRef) {
        userMessagesRef.get().subscribe(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.delete();
          });
        });
      } else {
        console.error('User Messages Reference is null');
      }
    }
  
    this.userService.logout().then(() => {
      this.router.navigate(['/home']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }

}
