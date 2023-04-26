import { Injectable } from '@angular/core';
import {Movie} from "../common/Movies";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  movieDB: Movie[] = [
    {
      id: 1,
      name: "The Lord of the Rings: The Fellowship of the Ring",
      picture: "https://m.media-amazon.com/images/I/51zdHsObfnL._AC_.jpg",
      year: 2001,
      income: 43212341,
      createdAt: new Date()
    },
    {
      id: 2,
      name: "The Lord of the Rings: The Two Towers",
      picture: "https://m.media-amazon.com/images/I/51uGVkvLkCL._AC_.jpg",
      year: 2002,
      income: 53212341,
      createdAt: new Date()
    },
    {
      id: 3,
      name: "The Lord of the Rings: The Return of the King",
      picture: "https://static.posters.cz/image/1300/poster/lord-of-the-rings-return-of-the-king-one-sheet-i11969.jpg",
      year: 2003,
      income: 63212341,
      createdAt: new Date()
    },
    {
      id: 4,
      name: "Iron Man",
      picture: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg",
      year: 2008,
      income: 300431,
      createdAt: new Date()
    }
  ]

  constructor() {

  }

  getMovies() {
    return this.movieDB
  }


}
