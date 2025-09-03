<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function generatePalette(Request $request)
    {
        
        $payload = [
            'model' => 'default'
        ];

        try {
            // Slanje POST zahteva Colormind API-ju
            $response = Http::post('http://colormind.io/api/', $payload);

            // Provera da li je zahtev uspeo
            if ($response->successful()) {
                // Vraćanje JSON odgovora sa paletom boja
                return response()->json([
                    'success' => true,
                    'palette' => $response->json()['result']
                ]);
            }

            // Ako zahtev nije uspeo, vraćanje greške
            return response()->json([
                'success' => false,
                'message' => 'Greška prilikom pozivanja Colormind API-ja.',
                'status' => $response->status()
            ], $response->status());

        } catch (\Exception $e) {
            // Hvatanje izuzetaka u slučaju problema sa mrežom ili serverom
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške na serveru: ' . $e->getMessage()
            ], 500);
        }
    }
}
