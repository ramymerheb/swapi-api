import { vehicles } from './vehicles.model';

export interface character {
    name: number;
    height?: number;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
    homeworld?: number;
    films?: string[];
    vehicles?: vehicles[];
    starships?: vehicles[];
    url?: string;
    id?: string;
}

export interface characterList{
    count: number;
    next: string;
    previous: string;
    results: Array<character>;

}