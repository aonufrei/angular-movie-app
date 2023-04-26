import { Injectable } from '@angular/core';
import {LIKED_MOVIES_BY_USERS} from "../common/UserPropertiesConstants";
import {Like} from "../common/Likes";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor() { }

  likesFromStorage() {
    const data = localStorage.getItem(LIKED_MOVIES_BY_USERS)
    if (data) {
      try {
        const likes : Like[] = JSON.parse(data)
        return likes
      } catch (e) {
        console.log("local storage contains invalid values about user likes")
      }
    }
    return []
  }

  getLikes(userId: number) {
    return [...this.likesFromStorage().filter(l => l.userId === userId).map(l => ({...l}))]
  }

  getLikedMovies(userId: number) {
    return this.getLikes(userId).map(l => l.movieId)
  }

  isSameLike(l1: Like, l2: Like) {
    return l1.userId === l2.userId && l1.movieId === l2.movieId
  }

  likeOrDislike(like: Like) {
    if (this.likesFromStorage().find(l => this.isSameLike(l, like))) {
      this.removeLike(like)
      console.log("dislike")
      return
    }
    console.log("like")
    this.addLike(like)
  }

  addLike(like: Like) {
    const likes = this.likesFromStorage()
    if (likes.find(l => this.isSameLike(like, l)))  {
      return
    }
    localStorage.setItem(LIKED_MOVIES_BY_USERS, JSON.stringify([...this.likesFromStorage(), like]))
  }

  removeLike(like: Like) {
    let likes = this.likesFromStorage()
    likes = likes.filter(l => !this.isSameLike(l, like))
    localStorage.setItem(LIKED_MOVIES_BY_USERS, JSON.stringify([...likes]))
  }


}
