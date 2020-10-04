import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { character, characterList } from '../_models/characters.model';
import { environment, } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  constructor(
    private httpService: HttpClient
  ) {}

  //send get request to get all characters 
  getCharactersList(pageUrl = null, keyword = ""): Observable<characterList> {
    // we check if nextPageUrl is null that mean this is the first time we're loading and we dont know what is the link for the next
    let url = (pageUrl != null)? pageUrl :  environment.baseAppUrlSecure + 'people/'  ; 
  
    //if we have a search keyword we concat it to the url as mentoind in swapi documentation
    if(keyword != ""){
      url = url +"?search=" + keyword
    }

    return this.httpService.get<characterList>(url);
  }

  getCharacter(characterId): Observable<character> {
    const url = environment.baseAppUrlSecure + 'people/' + characterId ; 
    return this.httpService.get<character>(url);
  }

}
