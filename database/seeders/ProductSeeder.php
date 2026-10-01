<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductSpecification;
use App\Models\ProductFeature;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Django 125cc Caferacer
        $djangoCaferacer = Product::create([
            'slug' => 'django-125-caferacer',
            'name' => 'Django 125cc Caferacer',
            'tagline' => 'Born from 1898 Motorsports Heritage',
            'category' => 'Neo-Retro (Django)',
            'category_key' => 'django',
            'price_npr' => 395000,
            'engine' => '125 cc EasyMotion EURO-5 EFI',
            'power' => '10.6 HP @ 8,000 RPM',
            'torque' => '9.3 Nm @ 6,500 RPM',
            'top_speed' => '95 km/h',
            'fuel_system' => 'EFI (Electronic Fuel Injection)',
            'braking' => 'ABS Front Disc & Rear SBC',
            'warranty' => '3 Years / 30,000 KM',
            'mileage' => '43 km/L',
            'description' => 'The Peugeot Django 125cc Caferacer is a neo-retro scooter that combines vintage motorsports elegance with modern performance, ideal for riders seeking style, comfort, and everyday practical agility.',
            'image' => 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80',
            'badge' => 'Special Motorsports Edition',
        ]);

        // Colors
        ProductColor::create([
            'product_id' => $djangoCaferacer->id,
            'color_name' => 'Matte Adventure Green & Bronze',
            'hex_code' => '#2E3B2B',
            'accent_hex' => '#D4AF37',
            'image_url' => 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80',
        ]);
        ProductColor::create([
            'product_id' => $djangoCaferacer->id,
            'color_name' => 'Satin Shadow Black & Gold',
            'hex_code' => '#111111',
            'accent_hex' => '#EAB308',
            'image_url' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80',
        ]);
        ProductColor::create([
            'product_id' => $djangoCaferacer->id,
            'color_name' => 'Polar White & Cream',
            'hex_code' => '#F8FAFC',
            'accent_hex' => '#D4AF37',
            'image_url' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80',
        ]);

        // Specs (Engine Type, Trim & Chassis, Dimensions, Others)
        $caferacerSpecs = [
            ['spec_group' => 'Engine Type', 'spec_key' => 'Engine Type', 'spec_value' => 'Air-Cooled 4-Stroke 2-Valve Single Cylinder'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Displacement', 'spec_value' => '124.8 cc'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Emission Standard', 'spec_value' => 'EURO-5'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Max. Power (kW/HP)', 'spec_value' => '7.8 kW / 10.6 HP @ 8000 RPM'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Max. Torque (N.M/RPM)', 'spec_value' => '9.3 Nm @ 6500 RPM'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Fuel Supply', 'spec_value' => 'Electronic Injection (EFI)'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Fuel Consumption', 'spec_value' => '2.3 L / 100 km'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Max. Speed', 'spec_value' => '95 km/h'],

            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Front Suspension', 'spec_value' => 'Hydraulic Telescopic Fork 32mm'],
            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Rear Suspension', 'spec_value' => 'Combined Adjustable Hydraulic Shock Absorber'],
            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Front Brake', 'spec_value' => 'Single ABS Disc 200 mm'],
            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Rear Brake', 'spec_value' => 'SBC Synchro Disc 190 mm'],
            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Front Tyre', 'spec_value' => '120/70-12 Tubeless'],
            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Rear Tyre', 'spec_value' => '120/70-12 Tubeless'],

            ['spec_group' => 'Dimensions', 'spec_key' => 'Length x Width x Height', 'spec_value' => '1925 x 710 x 1190 mm'],
            ['spec_group' => 'Dimensions', 'spec_key' => 'Wheelbase', 'spec_value' => '1350 mm'],
            ['spec_group' => 'Dimensions', 'spec_key' => 'Seat Height', 'spec_value' => '770 mm'],
            ['spec_group' => 'Dimensions', 'spec_key' => 'Dry Weight', 'spec_value' => '129 kg'],
            ['spec_group' => 'Dimensions', 'spec_key' => 'Fuel Tank Capacity', 'spec_value' => '8.5 Litres'],

            ['spec_group' => 'Others', 'spec_key' => 'Lighting', 'spec_value' => 'Full LED Lion Signature DRL'],
            ['spec_group' => 'Others', 'spec_key' => 'Instrument Cluster', 'spec_value' => 'Analog-Digital Neo-Retro Display'],
            ['spec_group' => 'Others', 'spec_key' => 'Glove Box', 'spec_value' => 'Lockable Dual Compartment with 12V USB Charger'],
        ];
        foreach ($caferacerSpecs as $s) {
            ProductSpecification::create(array_merge(['product_id' => $djangoCaferacer->id], $s));
        }

        // Features
        ProductFeature::create([
            'product_id' => $djangoCaferacer->id,
            'title' => 'Under-Seat Storage',
            'description' => 'The Django 125cc features generous under-seat storage that easily fits a jet helmet, combined with a lockable dual glove box and integrated 12V socket for ultimate daily convenience.',
            'image_url' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
        ]);
        ProductFeature::create([
            'product_id' => $djangoCaferacer->id,
            'title' => 'Comfort & Practicality',
            'description' => 'The Peugeot Django 125cc is designed with optimal rider ergonomics, featuring a plush dual-tone ribbed saddle, spacious legroom, and effortless maneuvering through busy Kathmandu traffic.',
            'image_url' => 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
        ]);
        ProductFeature::create([
            'product_id' => $djangoCaferacer->id,
            'title' => 'Iconic Neo-Retro Design',
            'description' => 'Tribute to the legendary 1955 S55 scooter. Featuring polished chrome mirrors, lion signature headlights, vintage motorsports numbers, and French luxury styling.',
            'image_url' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
        ]);


        // 2. Django 125 Classic
        $djangoClassic = Product::create([
            'slug' => 'django-125-classic',
            'name' => 'Django 125cc Classic',
            'tagline' => 'The Neo-Retro Icon of French Elegance',
            'category' => 'Neo-Retro (Django)',
            'category_key' => 'django',
            'price_npr' => 370000,
            'engine' => '125 cc 4-Stroke Air-Cooled EURO-5',
            'power' => '10.6 HP @ 8,000 RPM',
            'torque' => '9.3 Nm @ 6,500 RPM',
            'top_speed' => '95 km/h',
            'fuel_system' => 'EFI (Electronic Fuel Injection)',
            'braking' => 'SBC Synchro Disc Brakes',
            'warranty' => '3 Years / 30,000 KM',
            'mileage' => '45 km/L',
            'description' => 'Inspired by the legendary 1955 Peugeot S55, the Django 125 Classic combines vintage French retro aesthetics with EURO-5 EasyMotion EFI technology.',
            'image' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80',
            'badge' => 'Most Popular in Kathmandu',
        ]);
        ProductColor::create(['product_id' => $djangoClassic->id, 'color_name' => 'Ocean Blue & Milky White', 'hex_code' => '#00205B', 'accent_hex' => '#F8FAFC', 'image_url' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80']);
        ProductColor::create(['product_id' => $djangoClassic->id, 'color_name' => 'Bordeaux Cherry Red', 'hex_code' => '#8B0000', 'accent_hex' => '#FFFFFF', 'image_url' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80']);
        ProductColor::create(['product_id' => $djangoClassic->id, 'color_name' => 'Matte Onyx Black', 'hex_code' => '#1C1C1C', 'accent_hex' => '#D4AF37', 'image_url' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80']);


        // 3. Speedfight 4+ Sport 125 / 150
        $speedfight = Product::create([
            'slug' => 'speedfight-4-sport',
            'name' => 'Speedfight 4+ Sport 125/150',
            'tagline' => 'Pure Racing DNA for Urban Conquerors',
            'category' => 'Sport / Street (Speedfight)',
            'category_key' => 'speedfight',
            'price_npr' => 345000,
            'engine' => '125 cc / 150 cc SmartMotion Liquid Cooled',
            'power' => '11.0 HP / 14.5 HP',
            'torque' => '10.8 Nm / 13.2 Nm',
            'top_speed' => '100 km/h',
            'fuel_system' => 'EFI (Electronic Fuel Injection)',
            'braking' => 'Dual SBC Wave Discs',
            'warranty' => '3 Years / 30,000 KM',
            'mileage' => '42 km/L',
            'description' => 'The 4th generation of Europe\'s iconic sport scooter line. Equipped with twin LED projector headlamps inspired by Peugeot 508 lion fangs, LCD digital instrument cluster, RAM smartphone mount, and Showa gas suspension.',
            'image' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80',
            'badge' => 'Best Sport Scooter',
        ]);
        ProductColor::create(['product_id' => $speedfight->id, 'color_name' => 'Dark Emerald Green & Gold', 'hex_code' => '#064E3B', 'accent_hex' => '#D4AF37', 'image_url' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80']);
        ProductColor::create(['product_id' => $speedfight->id, 'color_name' => 'Acid Gold & Mad Black', 'hex_code' => '#EAB308', 'accent_hex' => '#090B10', 'image_url' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80']);
        ProductColor::create(['product_id' => $speedfight->id, 'color_name' => 'Icy White & Racing Red', 'hex_code' => '#DC2626', 'accent_hex' => '#FFFFFF', 'image_url' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80']);
        ProductColor::create(['product_id' => $speedfight->id, 'color_name' => 'Satin Midnight Black', 'hex_code' => '#0F172A', 'accent_hex' => '#00A3FF', 'image_url' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80']);

        $speedfightSpecs = [
            ['spec_group' => 'Engine Type', 'spec_key' => 'Engine Type', 'spec_value' => 'SmartMotion Liquid Cooled 4-Stroke EFI'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Displacement', 'spec_value' => '124.8 cc / 149.6 cc'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Max. Power (kW/HP)', 'spec_value' => '9.3 kW / 11.0 HP @ 8000 RPM'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Max. Torque (N.M)', 'spec_value' => '13.2 N.m @ 6500 RPM'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Fuel System', 'spec_value' => 'Electronic Injection'],
            ['spec_group' => 'Engine Type', 'spec_key' => 'Max Speed', 'spec_value' => '100 km/h'],

            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Front Suspension', 'spec_value' => 'Inverted Telescopic Hydraulic Fork'],
            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Rear Shock', 'spec_value' => 'Showa Rear Gas-Charged Mono-Shock'],
            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Front Brake', 'spec_value' => 'Shuricane Radial Wave Disc 215 mm'],
            ['spec_group' => 'Trim And Rear Chassis', 'spec_key' => 'Rear Brake', 'spec_value' => 'Wave Disc 190 mm with SBC Safety'],

            ['spec_group' => 'Dimensions', 'spec_key' => 'Length x Width x Height', 'spec_value' => '1895 x 700 x 1150 mm'],
            ['spec_group' => 'Dimensions', 'spec_key' => 'Seat Height', 'spec_value' => '800 mm'],
            ['spec_group' => 'Dimensions', 'spec_key' => 'Dry Weight', 'spec_value' => '116 kg'],
            ['spec_group' => 'Dimensions', 'spec_key' => 'Fuel Tank Capacity', 'spec_value' => '8.0 Litres'],

            ['spec_group' => 'Others', 'spec_key' => 'Display Cockpit', 'spec_value' => 'Full Digital LCD Screen with RAM Mount'],
            ['spec_group' => 'Others', 'spec_key' => 'Headlights', 'spec_value' => 'Twin LED Projector Headlights (508 Fang DRL)'],
        ];
        foreach ($speedfightSpecs as $s) {
            ProductSpecification::create(array_merge(['product_id' => $speedfight->id], $s));
        }

        ProductFeature::create([
            'product_id' => $speedfight->id,
            'title' => 'Twin LED Projector Headlights',
            'description' => 'Instantly recognizable on the road, the Speedfight features twin ultra-bright LED projector headlights with 508-inspired lion fang DRL daytime running lights.',
            'image_url' => 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
        ]);
        ProductFeature::create([
            'product_id' => $speedfight->id,
            'title' => 'Full Digital LCD Cockpit Display',
            'description' => 'Comprehensive digital instrument panel displaying speed, trip distance, fuel range, battery level, maintenance alerts, and integrated RAM smartphone holder support.',
            'image_url' => 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
        ]);
        ProductFeature::create([
            'product_id' => $speedfight->id,
            'title' => 'A Legacy Of Sport DNA & Handling',
            'description' => 'Engineered with lightweight sport lattice chassis and Showa gas rear suspension for unmatched precision cornering and high-speed stability.',
            'image_url' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
        ]);


        // 4. XP400 GT Maxi Adventure
        $xp400 = Product::create([
            'slug' => 'xp400-gt-maxi',
            'name' => 'XP400 GT Maxi Adventure',
            'tagline' => 'The Ultimate Premium Adventure Crossover',
            'category' => 'Maxi / Adventure (XP400 / Tweet)',
            'category_key' => 'xp400',
            'price_npr' => 1450000,
            'engine' => '400 cc PowerMotion EURO-5 Liquid Cooled',
            'power' => '36.7 HP @ 8,150 RPM',
            'torque' => '38.1 Nm @ 5,400 RPM',
            'top_speed' => '140 km/h',
            'fuel_system' => 'EFI (Electronic Fuel Injection)',
            'braking' => 'Dual Channel ABS + 295mm Twin Wave Discs',
            'warranty' => '3 Years / 50,000 KM',
            'mileage' => '26 km/L',
            'description' => 'Made in France at Mandeure. The XP400 GT combines high-end GT luxury with adventure capability. Features spoked wheels with Pirelli tires, keyless smart ignition, twin 295mm front wave disc brakes, and full i-Connect navigation.',
            'image' => 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80',
            'badge' => 'Flagship Luxury Crossover',
        ]);
        ProductColor::create(['product_id' => $xp400->id, 'color_name' => 'Shark Grey & Acid Cyan', 'hex_code' => '#475569', 'accent_hex' => '#00A3FF', 'image_url' => 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80']);
        ProductColor::create(['product_id' => $xp400->id, 'color_name' => 'Satin Titanium Black', 'hex_code' => '#1F2937', 'accent_hex' => '#94A3B8', 'image_url' => 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80']);


        // 5. Tweet 125 GT Urban
        $tweet = Product::create([
            'slug' => 'tweet-125-gt',
            'name' => 'Tweet 125 GT Urban',
            'tagline' => 'Agile High-Wheel Comfort for Kathmandu City',
            'category' => 'Maxi / Adventure (XP400 / Tweet)',
            'category_key' => 'xp400',
            'price_npr' => 315000,
            'engine' => '125 cc EasyMotion EURO-5 EFI',
            'power' => '11.5 HP @ 8,500 RPM',
            'torque' => '10.2 Nm @ 6,500 RPM',
            'top_speed' => '96 km/h',
            'fuel_system' => 'EFI (Electronic Fuel Injection)',
            'braking' => 'SBC Front & Rear Disc',
            'warranty' => '3 Years / 30,000 KM',
            'mileage' => '46 km/L',
            'description' => 'Specifically engineered for cobblestone and uneven city surfaces. Large 16-inch alloy wheels deliver superior stability, while its compact turning radius and flat deck make daily commuting effortlessly smooth.',
            'image' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80',
            'badge' => 'Urban Commuter Choice',
        ]);
        ProductColor::create(['product_id' => $tweet->id, 'color_name' => 'Antarctica Polar White', 'hex_code' => '#F8FAFC', 'accent_hex' => '#00205B', 'image_url' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80']);
        ProductColor::create(['product_id' => $tweet->id, 'color_name' => 'Onyx Midnight Black', 'hex_code' => '#0F172A', 'accent_hex' => '#00A3FF', 'image_url' => 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80']);
    }
}
