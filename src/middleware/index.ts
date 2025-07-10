import { defineMiddleware } from "astro:middleware";
import type { MiddlewareHandler } from 'astro';

// `context` and `next` are automatically typed
export const onRequest: MiddlewareHandler = defineMiddleware(async (context, next) => {
    const host = context.request.headers.get('host') || '';
    const url = new URL(context.request.url);
    const pathname = url.pathname;
    const hostname = url.hostname;



    // Extraer subdominio
    const subdomain = host.split('.')[0];

        console.log({host, url, pathname, subdomain})

    const isRootDomain = host === 'localhost:4321' || host === 'localhost.test:4321'; // para entorno dev puro

    if (!isRootDomain) {
        // Rewrite para tenants
        console.log(`/tenant/${subdomain}${pathname}`)
        return next(`/tenant/${subdomain}${pathname}`);
    }

    // Sigue el flujo normal (landing principal)
    return next();
    // return response;
    // Si no es una ruta de /dashboard, dejar pasar

    // if (!pathname.startsWith('/dashboard')) {
    //   return next();
    // }
  
    // // Comprobar si está en /admin/login o /admin/registro
    // const isPublicAdminRoute = pathname === '/auth/login' || pathname === '/auth/signup';
  
    // // Comprobar cookie
    // let identityCookieValue: any = context.cookies.get('identity')?.value || null;
    // let token = null;
  
    // try {
    //   if (identityCookieValue) {
    //     const identity = JSON.parse(identityCookieValue);
    //     token = identity.token;
    //   }
    // } catch (error) {
    //   console.error("Error al analizar el valor de la cookie:", error);
    // }
  
    // // Si tiene token, dejar pasar
    // if (token) {
    //   return next();
    // }
  
    // if (isPublicAdminRoute) {
    //   return next();
    // }
  
    // // Si no tiene token y no es ruta pública, redirigir
    // return context.redirect('/auth/login');
});