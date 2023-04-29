import {Injectable} from '@angular/core';
import {Movie, MovieForm} from "../common/Movies";
import {LikeService} from "./like.service";
import {SortMovieOption} from "../common/ListOptions";
import {BehaviorSubject, Observable} from "rxjs";

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
      favorite: false,
      income: 43212341,
      createdAt: this.createDateFromString("01 Jan 2023 00:00:00 GMT")
    },
    {
      id: 2,
      name: "The Lord of the Rings: The Two Towers",
      picture: "https://m.media-amazon.com/images/I/51uGVkvLkCL._AC_.jpg",
      year: 2002,
      favorite: false,
      income: 53212341,
      createdAt: this.createDateFromString("04 Jan 2023 00:00:00 GMT")
    },
    {
      id: 3,
      name: "The Lord of the Rings: The Return of the King",
      picture: "https://static.posters.cz/image/1300/poster/lord-of-the-rings-return-of-the-king-one-sheet-i11969.jpg",
      year: 2003,
      favorite: false,
      income: 63212341,
      createdAt: this.createDateFromString("02 Jan 2023 00:00:00 GMT")
    },
    {
      id: 4,
      name: "Iron Man",
      picture: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg",
      year: 2008,
      favorite: false,
      income: 300431,
      createdAt: this.createDateFromString("02 Jan 2023 10:00:00 GMT")
    }
  ]

  private movieListSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([])

  createDateFromString(s: string) {
    const d = new Date()
    d.setTime(Date.parse(s))
    return d
  }

  constructor(private likeService: LikeService) {

  }

  getMoviesObservable(): Observable<Movie[]> {
      return this.movieListSubject.asObservable();
  }

  getMovies() {
    // TODO: Use LocalStorage
    return [...this.movieDB]
  }

  addMovie(movie: Movie) {
    this.movieDB = [...this.movieDB, movie]
    this.movieListSubject.next(this.movieDB)
  }

  updateMovie(id: number, movie: Movie) {
    this.movieDB = [...this.movieDB.map(m => m.id !== id ? {...m} : {...movie, id})]
    this.movieListSubject.next(this.movieDB)
  }

  getMovieById(id: number): Movie | undefined {
    return this.movieDB.find(m => m.id === id)
  }

  removeMovie(movieId: number) {
    this.movieDB = [...this.movieDB.filter(m => m.id !== movieId)]
    this.movieListSubject.next(this.movieDB)
  }

  getMoviesForUser(userId: number) {
    const likedMovies = this.likeService.getLikedMovies(userId)
    const moviesToShow = this.getMovies()
    return moviesToShow.map(m => ({...m, favorite: likedMovies.includes(m.id)}))
  }

  getUserFavoriteMovies(userId: number) {
    const likedMovies = this.likeService.getLikedMovies(userId)
    const moviesToShow = this.getMovies()
    return moviesToShow.filter(m => likedMovies.includes(m.id)).map(m => ({...m, favorite: likedMovies.includes(m.id)}))
  }

  searchForMovie(movieFunc: () => Movie[], searchQuery: string, sorting: SortMovieOption): Movie[] {
    const all = movieFunc()
    //.sort((m1, m2) => this.compareMovies(m1, m2, sorting))
    if (!searchQuery || searchQuery.trim() === '') {
      return all
    }
    return all.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  buildMovie(movieForm: MovieForm): Movie {
    return {
      id: Math.floor(Math.random() * 99999999),
      ...movieForm,
      favorite: false,
      createdAt: new Date(),
    }
  }

}
