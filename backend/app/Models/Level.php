<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'order',
        'description',
        'base_color',
        'player_car',
        'parking_spots'
    ];

    protected $casts = [
        'player_car' => 'array',
        'parking_spots' => 'array'
    ];

    public function userLevels()
    {
        return $this->hasMany(UserLevel::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_levels')
                    ->withPivot('duration')
                    ->withTimestamps();
    }
}
