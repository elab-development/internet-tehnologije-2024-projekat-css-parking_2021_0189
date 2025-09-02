<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Proveravamo da li je korisnik autentifikovan i da li je admin
        if (!$request->user() || !$request->user()->isAdmin()) {
            return response()->json([
                'message' => 'Nemate ovlašćenje za ovu akciju. Samo administratori mogu pristupiti.'
            ], 403);
        }
        
        return $next($request);
    }
}
