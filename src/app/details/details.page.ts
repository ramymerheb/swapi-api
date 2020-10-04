import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { character } from '../_models/characters.model';
import { CharactersService } from '../_services/characters.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  films: {};
  filmList: string[] = [];
  character: character;

  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private storage: Storage,
    public platform: Platform
  ) {}
  
  ngOnInit() {
    this.getFilms()
    this.route.params.pipe(
      switchMap((params: Params) => this.charactersService.getCharacter(params['id']))
    ).subscribe(
      (data) => {
        data.films.map(film =>{
          //to retrun the film id
          const id = film.replace( environment.baseAppUrl + 'films/', "")
                          .replace('/', "");
          //replace film url with film name
          this.filmList.push(this.films[id])
        })
        data.films = this.filmList
        this.character = data;
    });
  }

  async getFilms(){
    this.storage.get(`films`).then(data => this.films =  data);
    console.log(" this.films  ",  this.films )
  }

}
