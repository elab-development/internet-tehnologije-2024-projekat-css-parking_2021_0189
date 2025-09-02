<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Level;

class LevelController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $levels = Level::orderBy('order', 'asc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $levels
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'order' => 'required|integer|unique:levels,order'
        ]);
        
        $level = Level::create($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Level uspešno kreiran',
            'data' => $level
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $level = Level::find($id);
        
        if (!$level) {
            return response()->json([
                'success' => false,
                'message' => 'Level nije pronađen'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $level
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $level = Level::find($id);
        
        if (!$level) {
            return response()->json([
                'success' => false,
                'message' => 'Level nije pronađen'
            ], 404);
        }
        
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'order' => 'sometimes|integer|unique:levels,order,' . $level->id
        ]);
        
        $level->update($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Level uspešno ažuriran',
            'data' => $level
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $level = Level::find($id);
        
        if (!$level) {
            return response()->json([
                'success' => false,
                'message' => 'Level nije pronađen'
            ], 404);
        }
        
        $level->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Level uspešno obrisan'
        ]);
    }
}
