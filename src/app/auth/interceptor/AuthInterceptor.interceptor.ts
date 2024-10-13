import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { from, Observable, switchMap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private afAuth: AngularFireAuth) { }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     return from(this.afAuth.currentUser).pipe(
    //         switchMap(user => {
    //             console.log("dummy user", user);

    //             return user ? from(user.getIdToken()).pipe(
    //                 switchMap(token => {
    //                     console.log("dummy token", token);
    //                     user.getIdToken().then(token => console.log(JSON.parse(atob(token.split('.')[1]))));

    //                     const clonedReq = req.clone({
    //                         setHeaders: {
    //                             Authorization: `Bearer ${token}`
    //                         }
    //                     });
    //                     console.log("dummy token", clonedReq);

    //                     return next.handle(clonedReq);
    //                 })
    //             ) : next.handle(req);
    //         })
    //     )
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.getCookie('authToken'); // Fetch token from cookies

        if (token) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(clonedReq);
        } else {
            return next.handle(req);
        }
    }

    // Helper function to get the token from cookies
    getCookie(name: string): string | null {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
}