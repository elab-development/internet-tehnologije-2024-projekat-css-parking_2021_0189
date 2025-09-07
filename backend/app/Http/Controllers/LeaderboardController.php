<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Level;
use App\Models\UserLevel;

class LeaderboardController extends Controller
{
    // Vrati listu nivoa sa kratkim informacijama i najboljim rezultatom (ako postoji)
    public function index()
    {
        $levels = Level::orderBy('order')->get();

        $data = $levels->map(function ($level) {
            $best = UserLevel::where('level_id', $level->id)
                ->whereNotNull('duration')
                ->orderBy('duration', 'asc')
                ->with('user:id,name')
                ->first();

            return [
                'id' => $level->id,
                'title' => $level->title,
                'order' => $level->order,
                'best' => $best ? [
                    'duration' => $best->duration,
                    'user' => $best->user ? ['id' => $best->user->id, 'name' => $best->user->name] : null
                ] : null
            ];
        });

        return response()->json($data);
    }

    // Prikaži top N za dati nivo (query param: ?limit=10)
    public function show(Request $request, $levelOrder)
    {
        $limit = (int) $request->query('limit', 10);
        $limit = max(1, min(100, $limit));

        // nađi level po njegovom order broju
        $level = Level::where('order', $levelOrder)->firstOrFail();

        // sada vadi UserLevel rezultate za taj level.id
        $results = UserLevel::where('level_id', $level->id)
            ->whereNotNull('duration')
            ->orderBy('duration', 'asc')
            ->with('user:id,name')
            ->limit($limit)
            ->get()
            ->map(function ($row) {
                return [
                    'id' => $row->id,
                    'user' => $row->user ? [
                        'id' => $row->user->id,
                        'name' => $row->user->name
                    ] : null,
                    'duration' => $row->duration,
                ];
            });

        return response()->json([
            'levelId'    => $level->id,
            'levelOrder' => $level->order,
            'levelTitle' => $level->title,
            'top'        => $results,
        ]);
    }

}