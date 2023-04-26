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
    return this.likesFromStorage().filter(l => l.userId === userId)
  }

  isSameLike(l1: Like, l2: Like) {
    return l1.userId === l2.userId && l1.movieId === l2.movieId
  }

  addLike(like: Like) {
    const likes = this.likesFromStorage()
    if (likes.find(l => this.isSameLike(like, l)))  {
      return
    }
    localStorage.setItem(LIKED_MOVIES_BY_USERS, JSON.stringify([...this.likesFromStorage(), like]))
  }

  removeLike(like: Like) {
    const likes = this.likesFromStorage()
    const remaining = likes.filter(l => this.isSameLike(like, l))
    if (likes.length === remaining.length)  {
      return
    }
    localStorage.setItem(LIKED_MOVIES_BY_USERS, JSON.stringify([...remaining]))
  }


}
