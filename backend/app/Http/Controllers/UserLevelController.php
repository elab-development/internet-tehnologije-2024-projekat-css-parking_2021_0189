<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserLevel;
use App\Models\User;
use App\Models\Level;

class UserLevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userLevels = UserLevel::with(['user', 'level'])->get();
        
        return response()->json([
            'success' => true,
            'data' => $userLevels
        ]);
    }

    /**
     * Prikaz user-level veza za trenutnog korisnika
     */
    public function showUserLevels(Request $request)
    {
        $userLevels = UserLevel::where('user_id', $request->user()->id)
            ->with('level')
            ->get();
        
        return response()->json([
            'success' => true,
            'data' => $userLevels
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'level_id' => 'required|exists:levels,id',
            'duration' => 'nullable|integer|min:0' // u sekundama
        ]);
        
        // Provera da li već postoji veza za ovog korisnika i level
        $existingUserLevel = UserLevel::where('user_id', $request->user()->id)
            ->where('level_id', $validated['level_id'])
            ->first();
        
        if ($existingUserLevel) {
            // Ako postoji, ažuriraj duration
            $existingUserLevel->update(['duration' => $validated['duration']]);
            
            return response()->json([
                'success' => true,
                'message' => 'User-Level veza uspešno ažurirana',
                'data' => $existingUserLevel
            ]);
        }
        
        // Ako ne postoji, kreiraj novu
        $userLevel = UserLevel::create([
            'user_id' => $request->user()->id,
            'level_id' => $validated['level_id'],
            'duration' => $validated['duration']
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'User-Level veza uspešno kreirana',
            'data' => $userLevel->load('level')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userLevel = UserLevel::with(['user', 'level'])->find($id);
        
        if (!$userLevel) {
            return response()->json([
                'success' => false,
                'message' => 'User-Level veza nije pronađena'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $userLevel
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $userLevel = UserLevel::find($id);
        
        if (!$userLevel) {
            return response()->json([
                'success' => false,
                'message' => 'User-Level veza nije pronađena'
            ], 404);
        }
        
        // Provera da li korisnik ima pravo da ažurira (samo admin ili vlasnik)
        if (!auth()->user()->isAdmin() && auth()->user()->id !== $userLevel->user_id) {
            return response()->json([
                'message' => 'Nemate pravo da ažurirate ovu vezu'
            ], 403);
        }
        
        $validated = $request->validate([
            'duration' => 'required|integer|min:1'
        ]);
        
        $userLevel->update($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'User-Level veza uspešno ažurirana',
            'data' => $userLevel
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userLevel = UserLevel::find($id);
        
        if (!$userLevel) {
            return response()->json([
                'success' => false,
                'message' => 'User-Level veza nije pronađena'
            ], 404);
        }
        
        $userLevel->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'User-Level veza uspešno obrisana'
        ]);
    }

    public function getLeaderboard($levelId)
    {
        $level = Level::find($levelId);
        
        if (!$level) {
            return response()->json([
                'success' => false,
                'message' => 'Level nije pronađen'
            ], 404);
        }
        
        $leaderboard = UserLevel::where('level_id', $levelId)
            ->whereNotNull('duration') // Samo oni koji su završili level
            ->with('user')
            ->orderBy('duration', 'asc') // Manji duration = bolji rezultat
            ->take(10)
            ->get();
        
        return response()->json([
            'success' => true,
            'level' => $level,
            'leaderboard' => $leaderboard
        ]);
    }

    public function getUserLevelsWithStatus(Request $request)
    {
        $userId = $request->user()->id;
        
        // Dohvati sve levelove
        $levels = Level::orderBy('order', 'asc')->get();
        
        // Dohvati user-level veze za korisnika
        $userLevels = UserLevel::where('user_id', $userId)
            ->get()
            ->keyBy('level_id');
        
        // Spoji podatke
        $result = $levels->map(function ($level) use ($userLevels) {
            $userLevel = $userLevels->get($level->id);
            
            return [
                'id' => $level->id,
                'title' => $level->title,
                'order' => $level->order,
                'completed' => !is_null($userLevel?->duration),
                'duration' => $userLevel->duration ?? null,
                'started_at' => $userLevel->created_at ?? null
            ];
        });
        
        return response()->json([
            'success' => true,
            'data' => $result
        ]);
    }
}
