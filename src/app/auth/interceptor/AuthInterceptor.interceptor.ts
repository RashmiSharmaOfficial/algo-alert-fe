import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { from, Observable, switchMap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private afAuth: AngularFireAuth) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.afAuth.currentUser).pipe(
            switchMap(user => {
                console.log("dummy user", user);
                return user ? from(user.getIdToken()).pipe(
                    switchMap(token => {
                        console.log("dummy token", token);

                        const clonedReq = req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        console.log("dummy token", clonedReq);

                        return next.handle(clonedReq);
                    })
                ) : next.handle(req);
            })
        )
    }
}