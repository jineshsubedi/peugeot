<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DealerApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_name',
        'contact_person',
        'phone',
        'email',
        'city',
        'showroom_space',
        'status',
    ];
}
