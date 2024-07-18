// dark-mode.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkMode {

  private darkMode: boolean = false;

  changeThemeColor(){
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('dark-theme')){
      body.classList.remove('dark-theme');
    } else {
      body.classList.add('dark-theme');
    }
    return true
  }
}
