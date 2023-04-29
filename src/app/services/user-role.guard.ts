import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {GUEST_USER} from "../common/User";

const guestGuard = () => {
  const router = inject(Router)
  const authService = inject(AuthService);
  console.log("Here")
  const isAllowed = authService.currentUser.role > GUEST_USER.role
  if (!isAllowed) {
    router.navigate(["/no-access"])
  }
  return isAllowed
};

export {guestGuard}
