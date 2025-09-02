<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $users = User::withCount('userLevels')
            ->with(['userLevels' => function($query) {
                $query->whereNotNull('duration');
            }])
            ->paginate(10);
        
        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Korisnik nije pronađen'
            ], 404);
        }
        
        // Ne dozvoli brisanje samog sebe
        if ($user->id === auth()->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'Ne možete obrisati sopstveni nalog'
            ], 400);
        }
        
        $user->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Korisnik uspešno obrisan'
        ]);
    }
}
