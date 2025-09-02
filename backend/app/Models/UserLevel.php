<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLevel extends Model
{

    protected $fillable = [
        'user_id',
        'level_id',
        'duration',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function level()
    {
        return $this->belongsTo(Level::class);
    }

    public function getIsCompletedAttribute()
    {
        return !is_null($this->duration);
    }
}
