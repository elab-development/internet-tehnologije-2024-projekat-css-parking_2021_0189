<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Level;
use App\Models\UserLevel;
use Illuminate\Support\Facades\Cache;

class LevelController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $levels = Cache::remember('levels', 3600, function () {
            return Level::orderBy('order', 'asc')->get();
        });
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
            'order' => 'required|integer|unique:levels,order',
            'description' => 'nullable|string',
            'base_color' => 'nullable|string|max:9',
            'player_car' => 'required|array',
            'player_car.x' => 'required|integer',
            'player_car.y' => 'required|integer',
            'player_car.width' => 'required|integer',
            'player_car.height' => 'required|integer',
            'player_car.rotate' => 'required|numeric',
            'player_car.color' => 'required|string|max:7',
            'player_car.*.scale' => 'nullable|array',
            'player_car.*.scale.x' => 'required_with:player_car.*.scale|numeric',
            'player_car.*.scale.y' => 'required_with:player_car.*.scale|numeric',
            'player_car.*.skew' => 'nullable|array',
            'player_car.*.skew.x' => 'required_with:player_car.*.skew|numeric',
            'player_car.*.skew.y' => 'required_with:player_car.*.skew|numeric',
            'parking_spots' => 'required|array',
            'parking_spots.*.id' => 'required|integer',
            'parking_spots.*.x' => 'required|integer',
            'parking_spots.*.y' => 'required|integer',
            'parking_spots.*.width' => 'required|integer',
            'parking_spots.*.height' => 'required|integer',
            'parking_spots.*.rotate' => 'required|numeric',
            'parking_spots.*.scale' => 'nullable|array',
            'parking_spots.*.scale.x' => 'required_with:parking_spots.*.scale|numeric',
            'parking_spots.*.scale.y' => 'required_with:parking_spots.*.scale|numeric',
            'parking_spots.*.skew' => 'nullable|array',
            'parking_spots.*.skew.x' => 'required_with:parking_spots.*.skew|numeric',
            'parking_spots.*.skew.y' => 'required_with:parking_spots.*.skew|numeric',
            'parking_spots.*.is_target' => 'required|boolean',
            'parking_spots.*.color' => 'required|string|max:7'
        ]);


        $level = Level::create($validated);

        Cache::forget('levels');
        Cache::forget('level_order_' . $level->order);
        Cache::forget('level_' . $level->id);

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
        $level = Cache::remember("level_{$id}", 300, function () use ($id) {
            return Level::find($id);
        });
        
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

    public function getByOrder(string $order)
    {
        $level = Cache::remember('level_order_' . $order, 3600, function () use ($order) {
            return Level::where('order', $order)->first();
        });
        
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
            'title' => 'required|string|max:255',
            'order' => 'required|integer|unique:levels,order',
            'description' => 'nullable|string',
            'base_color' => 'nullable|string|max:7',
            'player_car' => 'required|array',
            'player_car.x' => 'required|integer',
            'player_car.y' => 'required|integer',
            'player_car.width' => 'required|integer',
            'player_car.height' => 'required|integer',
            'player_car.rotate' => 'required|numeric',
            'player_car.color' => 'required|string|max:7',
            'parking_spots' => 'required|array',
            'parking_spots.*.id' => 'required|integer',
            'parking_spots.*.x' => 'required|integer',
            'parking_spots.*.y' => 'required|integer',
            'parking_spots.*.width' => 'required|integer',
            'parking_spots.*.height' => 'required|integer',
            'parking_spots.*.rotate' => 'required|numeric',
            'parking_spots.*.skew' => 'nullable|numeric',
            'parking_spots.*.scale' => 'nullable|numeric',
            'parking_spots.*.is_target' => 'required|boolean',
            'parking_spots.*.color' => 'required|string|max:7'
        ]);
        
        $level->update($validated);
        
        Cache::forget('levels');
        Cache::forget('level_' . $level->id);
        Cache::forget('level_order_' . $level->order);

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

        Cache::forget('levels');
        Cache::forget('level_' . $level->id);
        Cache::forget('level_order_' . $level->order);
        
        return response()->json([
            'success' => true,
            'message' => 'Level uspešno obrisan'
        ]);
    }

    public function complete(Request $request, $id)
    {
        $validated = $request->validate([
            'duration' => 'required|integer|min:1',
        ]);
        
        $level = Level::find($id);
        
        if (!$level) {
            return response()->json([
                'success' => false,
                'message' => 'Level nije pronađen'
            ], 404);
        }
        
        // Sačuvaj ili ažuriraj napredak korisnika
        $userLevel = UserLevel::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'level_id' => $level->id
            ],
            [
                'duration' => $validated['duration']
            ]
        );
        
        return response()->json([
            'success' => true,
            'message' => 'Nivo uspešno završen',
            'data' => $userLevel
        ]);
    }
}
