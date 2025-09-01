<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'order',
    ];

    
    public function userLevels()
    {
        return $this->hasMany(UserLevel::class);
    }
}
