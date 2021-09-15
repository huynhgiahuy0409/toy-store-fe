"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginEffects = void 0;
var core_1 = require("@angular/core");
var LoginEffects = /** @class */ (function () {
    /* loadLoginPage$ = createEffect(() =>
      this.actions$.pipe(
        ofType(postActions.getPosts),
        mergeMap(() => this.postService.get('posts')),
        map((posts) => postActions.getPostsSuccess({ posts })),
        catchError((error) => of(postActions.getPostsFailed({ error })))
      )
    ); */
    function LoginEffects(actions$, httpService) {
        this.actions$ = actions$;
        this.httpService = httpService;
    }
    LoginEffects = __decorate([
        core_1.Injectable()
    ], LoginEffects);
    return LoginEffects;
}());
exports.LoginEffects = LoginEffects;
