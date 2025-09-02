<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'sometimes|in:admin,user' // Opciono, ako želite da specificirate ulogu
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'user', // Podrazumevana uloga je 'user'
        ]);
        
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'message' => 'Uspešna registracija',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Pogrešni kredencijali'
            ], 401);
        }
        
        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;
        
        return response()->json([
            'message' => 'Uspešno prijavljivanje',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Uspešno odjavljivanje'
        ]);
    }

}
