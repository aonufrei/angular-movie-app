import {Injectable} from '@angular/core';
import {GUEST_USER, User, UserRole} from "../common/User";
import {USER_LIST} from "../common/UserPropertiesConstants";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User = GUEST_USER

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(this.currentUser)
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])

  constructor() {
    this.updateCurrentUser()
  }

  getUserObserver() {
    return this.userSubject.asObservable()
  }

  getUserListObserver() {
    return this.usersSubject.asObservable()
  }

  updateCurrentUser() {
    this.currentUser = this.getUserList().find(u => u.authenticated) || GUEST_USER
    this.userSubject.next(this.currentUser)
  }

  getUserList(): User[] {
    const data = localStorage.getItem(USER_LIST)
    if (data) {
      try {
        return JSON.parse(data)
      } catch (e) {
        console.log("Invalid value is provided to local storage. Cannot parse user list");
        localStorage.removeItem(USER_LIST)
      }
    }
    return [GUEST_USER]
  }

  login(username: string, password: string) {
    const success = this.users.find(u => u.username === username && u.password === password) !== undefined
    const nUsers = this.users.map(u => ({...u, authenticated: u.username === username && u.password === password}))
    localStorage.setItem(USER_LIST, JSON.stringify(nUsers))
    this.usersSubject.next(nUsers)
    this.updateCurrentUser()
    return success
  }

  logout() {
    const nUsers = this.users.map(u => ({...u, authenticated: false}))
    localStorage.setItem(USER_LIST, JSON.stringify(nUsers))
    this.usersSubject.next(nUsers)
    this.updateCurrentUser()
  }

  register(username: string, password: string, role: UserRole) {
    const user = this.buildUser(username, password, role)
    const noGuestsUsers = this.users.filter(u => u.role !== GUEST_USER.role).map(u => ({...u}))
    const newUserList = [...noGuestsUsers, user]
    localStorage.setItem(USER_LIST, JSON.stringify(newUserList))
    this.usersSubject.next(newUserList)
    return true
  }

  changeUserRole(userId: number, role: UserRole) {
    const updatedUsers = this.users.map(u => ({...u, role: u.id === userId ? role : u.role}))
    localStorage.setItem(USER_LIST, JSON.stringify(updatedUsers))
    this.usersSubject.next(updatedUsers)
    this.updateCurrentUser()
  }

  getEditMoviePermissionFor(user: User) {
    return user.role >= UserRole.MODERATOR
  }

  getMarkMoviePermissionFor(user: User) {
    return user.role >= UserRole.REGULAR
  }

  getAddMoviePermissionFor(user: User) {
    return user.role >= UserRole.MODERATOR
  }

  getManageUsersPermissionFor(user: User) {
    return user.role >= UserRole.ADMIN
  }

  getFavoriteMoviesPagePermissionFor(user: User) {
    return user.role > UserRole.GUEST
  }

  buildUser(username: string, password: string, role: UserRole): User {
    return {
      id: Math.floor(Math.random() * 99999999),
      username,
      password,
      role,
      authenticated: false,
    }
  }

  get users(): User[] {
    return this.getUserList()
  }
}
