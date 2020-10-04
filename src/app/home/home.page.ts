import { Component, OnInit } from '@angular/core';
import { character } from '../_models/characters.model';
import { CharactersService } from '../_services/characters.service';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { FilmsService } from '../_services/films.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  nextPagePageUrl = null;
  characters: character[];
  keyword: string = "";
  failedLoadAttempts: number = 0;
  filmsLoaded: {};
  dataListFillInterval: any;

  constructor(
    private charactersService: CharactersService,
    private filmsService: FilmsService,
    private storage: Storage,
    public platform: Platform
  ){
    
  }

  ngOnInit() {
    this.characters = []
        //we get list of all available movies create an object of movie id and movie name and save it in local storage which will make it faster for us to assign the films of each actors
    this.filmsService.getFilmsList().subscribe(
      data => {
        const filmsList = {}
          data.results.map(
              movie => {
                  filmsList[ movie['episode_id'] ] = movie['title'] 
              }
          )
          this.storage.set('films', filmsList);
          this.filmsLoaded = true;
        }
  );
    this.tryLoadMoreData()   
  }

  //to force loading elements until the list height is greater than device-height
   tryLoadMoreData = () => {
    let l = document.getElementById('datalist');  
    console.log(this.platform.height() )  
    console.log(l.scrollHeight )  
    console.log( l &&
      (this.platform.height() > l.scrollHeight) && //is the list shorter than the screen
      this.failedLoadAttempts < 20 //we should not try forever
  )

    if( l &&
        (this.platform.height() > l.scrollHeight) && //is the list shorter than the screen
        (this.failedLoadAttempts < 20) //we should not try forever
    ){
      this.getCharacters(this.nextPagePageUrl);
      this.dataListFillInterval = setInterval(this.tryLoadMoreData, 500);
    }else{
      clearInterval(this.dataListFillInterval);
    }
  } 
  refresh(ev) {
    this.characters = []
    this.nextPagePageUrl=null
    this.getCharacters(this.nextPagePageUrl, "");
    ev.detail.complete();
  }

  getCharacters(nextPagePageUrl, event? ){
    this.charactersService.getCharactersList(nextPagePageUrl, this.keyword).subscribe(
      data => {
        this.nextPagePageUrl = data.next
        data.results.map(data => {
          //to retrun the character id
          data.id = data.url.replace(environment.baseAppUrl+'people/', "");
        })

        this.characters =  this.characters.concat( data.results )

        if (nextPagePageUrl != null && event)
            event.target.complete();
        this.failedLoadAttempts ++ 
      }
    )
  }
  
  loadData(event) {
    this.getCharacters(this.nextPagePageUrl, event);
  }

  filter(event) {
    this.characters = []
    this.nextPagePageUrl=null
    this.keyword = event.detail.value;
    this.getCharacters(this.nextPagePageUrl, "");
    }
}
