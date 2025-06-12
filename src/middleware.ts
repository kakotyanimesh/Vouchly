import NextAuth from "next-auth"
import { authConfig } from "../auth.config"
import { authapiPrefix,authenticationRoutes, DEFAULT_REDIRECT_URL, publicRoutes } from "./utils/lib/middleware_routes"


const {auth} = NextAuth(authConfig)
 
export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth

  const {nextUrl } = req
  // next url is a whole long url object having href, pathname port etc
  // console.log(nextUrl);

  const isApiAuthRoutes = nextUrl.pathname.startsWith(authapiPrefix)

  // console.log(isApiAuthRoutes);
  // const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isPublicRoutes = publicRoutes.some((route) => {
    return nextUrl.pathname === route || (route.endsWith("/") && nextUrl.pathname.startsWith(route.replace("/*", "/")))
  })

  // console.log(isPublicRoutes, "public", nextUrl.pathname);
  
  const isAuthenticationRoutes = authenticationRoutes.includes(nextUrl.pathname)

  // console.log("auth", isAuthenticationRoutes);

  /**
   * user try to visit /api/auth for signin from anything 
   * let them be in
   */
  if(isApiAuthRoutes){
    return
  }

  /**
   * if user goes to /signup or /login page let them be in
   * if already logged in them redirect to default_redirect_url
   */
  if(isAuthenticationRoutes){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl))
    }
    return 
  }

  // if (isLoggedIn && isPublicRoutes) {
  //   return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
  // }

  if(!isLoggedIn && !isPublicRoutes){
    return Response.redirect(new URL("/signin", nextUrl))
  }


  return 

  
})
 

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}