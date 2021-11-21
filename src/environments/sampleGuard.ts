import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Injectable()
export class SampleGuard implements CanActivate {
    
    constructor(private router: Router, private tokenService: TokenService) {}

    canActivate() {
        if(this.tokenService.getToken() != null) {            
            return true;
        } else {        
            this.router.navigate(['/']);
            return false;
        }
    }
}