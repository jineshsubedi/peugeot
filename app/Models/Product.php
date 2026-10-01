<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['image_url', 'priceNPR', 'priceFormatted'];

    public function getImageUrlAttribute()
    {
        return $this->attributes['image'] ?? null;
    }

    public function getPriceNPRAttribute()
    {
        return $this->attributes['price_npr'] ?? 0;
    }

    public function getPriceFormattedAttribute()
    {
        $price = $this->attributes['price_npr'] ?? 0;
        return 'NPR ' . number_format((float)$price);
    }

    public function colors()
    {
        return $this->hasMany(ProductColor::class);
    }

    public function specifications()
    {
        return $this->hasMany(ProductSpecification::class);
    }

    public function features()
    {
        return $this->hasMany(ProductFeature::class);
    }
}
