import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { environment, } from '../../environments/environment';
import { filmsList } from '../_models/films.model';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage'; // This line added manually.
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  constructor(
    private httpService: HttpClient,
    private storage: Storage,
    public platform: Platform
  ) {}

  getFilmsList(): Observable<any> {
    let url =  environment.baseAppUrlSecure + 'films/'  ; 
     return this.httpService.get<filmsList>(url)
  }
}
