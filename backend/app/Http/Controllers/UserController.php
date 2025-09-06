<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = User::query();
        
        // Search/filter functionality
        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Role filter
        if ($request->has('role') && $request->role != '') {
            $query->where('role', $request->role);
        }

        // Pagination
        $perPage = $request->per_page ?? 10;
        $users = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    public function show(Request $request)
    {
        return response()->json($request->user());
    }
    
    public function update(Request $request)
    {
        $user = $request->user();

        $rules = [
            'name' => 'required|string|max:255',
            'email' => ['required','email','max:255', Rule::unique('users')->ignore($user->id)],
        ];

        // ako menjaš lozinku
        if ($request->filled('password')) {
            $rules['current_password'] = ['required'];
            $rules['password'] = ['required','confirmed', Password::defaults()];
        }

        $data = $request->validate($rules);

        if ($request->filled('password')) {
            if (! Hash::check($request->current_password, $user->password)) {
                return response()->json(['message' => 'Trenutna lozinka nije tačna.'], 422);
            }
            $user->password = Hash::make($request->password);
        }

        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->save();

        return response()->json($user);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();

        // opcionalno: obriši povezane zapise (user_levels)
        $user->levels()->delete(); // ili detach pivot

        // obriši sve token-e
        $user->tokens()->delete();

        $user->delete();

        return response()->json(['message' => 'Nalog obrisan.']);
    }
    
    
     
    public function destroyAccount(string $id)
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
    

    public function exportUsers(Request $request)
    {
        $users = User::all();

        $csvFileName = 'users_' . date('Y-m-d') . '.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
        ];

        $callback = function() use ($users) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID', 'Name', 'Email', 'Role', 'Created At']);

            foreach ($users as $user) {
                fputcsv($file, [
                    $user->id,
                    $user->name,
                    $user->email,
                    $user->role,
                    $user->created_at
                ]);
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
