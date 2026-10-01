<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\TestRide;
use App\Models\DealerApplication;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $testRides = TestRide::orderBy('created_at', 'desc')->get();
        $dealerApps = DealerApplication::orderBy('created_at', 'desc')->get();
        $products = Product::with(['colors', 'specifications', 'features'])->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Dashboard', [
            'testRides' => $testRides,
            'dealerApps' => $dealerApps,
            'products' => $products,
        ]);
    }

    // Booking Creation by Admin
    public function storeTestRide(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'city' => 'required|string|max:100',
            'model_id' => 'required|string|max:100',
            'ride_date' => 'required|date',
            'need_finance' => 'nullable|boolean',
            'status' => 'required|string',
        ]);

        TestRide::create([
            'full_name' => $validated['full_name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'city' => $validated['city'],
            'model_id' => $validated['model_id'],
            'ride_date' => $validated['ride_date'],
            'need_finance' => $validated['need_finance'] ?? false,
            'status' => $validated['status'],
        ]);

        return back()->with('success', 'Booking created successfully!');
    }

    public function updateTestRideStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $testRide = TestRide::findOrFail($id);
        $testRide->status = $request->input('status');
        $testRide->save();

        return back()->with('success', 'Booking status updated successfully.');
    }

    public function destroyTestRide($id)
    {
        $testRide = TestRide::findOrFail($id);
        $testRide->delete();

        return back()->with('success', 'Booking deleted successfully.');
    }

    public function updateDealerAppStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $dealerApp = DealerApplication::findOrFail($id);
        $dealerApp->status = $request->input('status');
        $dealerApp->save();

        return back()->with('success', 'Dealer application status updated successfully.');
    }

    public function destroyDealerApp($id)
    {
        $dealerApp = DealerApplication::findOrFail($id);
        $dealerApp->delete();

        return back()->with('success', 'Dealer application deleted successfully.');
    }

    // Product Creation by Admin
    public function storeProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug',
            'tagline' => 'nullable|string|max:255',
            'category' => 'required|string|max:100',
            'category_key' => 'required|string|max:50',
            'price_npr' => 'required|numeric',
            'engine' => 'nullable|string|max:255',
            'power' => 'nullable|string|max:255',
            'torque' => 'nullable|string|max:255',
            'top_speed' => 'nullable|string|max:100',
            'fuel_system' => 'nullable|string|max:255',
            'braking' => 'nullable|string|max:255',
            'warranty' => 'nullable|string|max:255',
            'mileage' => 'nullable|string|max:255',
            'badge' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        }
        unset($validated['image_file']);

        $product = Product::create($validated);

        // Add default color
        ProductColor::create([
            'product_id' => $product->id,
            'color_name' => 'Default Color',
            'hex_code' => '#00205B',
            'accent_hex' => '#00A3FF',
            'image_url' => $product->image ?: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80',
        ]);

        return back()->with('success', 'Product created successfully!');
    }

    // Product Update by Admin
    public function updateProduct(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $product->id,
            'tagline' => 'nullable|string|max:255',
            'category' => 'required|string|max:100',
            'category_key' => 'required|string|max:50',
            'price_npr' => 'required|numeric',
            'engine' => 'nullable|string|max:255',
            'power' => 'nullable|string|max:255',
            'torque' => 'nullable|string|max:255',
            'top_speed' => 'nullable|string|max:100',
            'fuel_system' => 'nullable|string|max:255',
            'braking' => 'nullable|string|max:255',
            'warranty' => 'nullable|string|max:255',
            'mileage' => 'nullable|string|max:255',
            'badge' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|max:10240',
            'colors' => 'nullable',
        ]);

        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('products', 'public');
            $validated['image'] = '/storage/' . $path;
        }
        unset($validated['image_file']);

        // Extract colors before product update
        $colorsInput = $request->input('colors');
        unset($validated['colors']);

        $product->update($validated);

        // Update colors if provided
        if ($colorsInput) {
            $colorsData = is_string($colorsInput) ? json_decode($colorsInput, true) : $colorsInput;
            if (is_array($colorsData)) {
                $processedIds = [];
                foreach ($colorsData as $c) {
                    if (!empty($c['id'])) {
                        // Update existing color
                        $colorModel = ProductColor::where('id', $c['id'])->where('product_id', $product->id)->first();
                        if ($colorModel) {
                            $colorModel->update([
                                'color_name' => $c['color_name'] ?? $c['name'] ?? 'Color Variant',
                                'hex_code' => $c['hex_code'] ?? $c['hex'] ?? '#00205B',
                                'accent_hex' => $c['accent_hex'] ?? $c['accentHex'] ?? null,
                                'image_url' => $c['image_url'] ?? $c['previewUrl'] ?? $product->image,
                            ]);
                            $processedIds[] = $colorModel->id;
                        }
                    } else {
                        // Create new color
                        $newColor = ProductColor::create([
                            'product_id' => $product->id,
                            'color_name' => $c['color_name'] ?? $c['name'] ?? 'New Color',
                            'hex_code' => $c['hex_code'] ?? $c['hex'] ?? '#00205B',
                            'accent_hex' => $c['accent_hex'] ?? $c['accentHex'] ?? null,
                            'image_url' => $c['image_url'] ?? $c['previewUrl'] ?? $product->image,
                        ]);
                        $processedIds[] = $newColor->id;
                    }
                }
                // Optional: remove colors not in list if user explicitly removed them
                if (!empty($processedIds)) {
                    ProductColor::where('product_id', $product->id)->whereNotIn('id', $processedIds)->delete();
                }
            }
        }

        return back()->with('success', 'Product updated successfully!');
    }

    public function destroyProduct($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return back()->with('success', 'Product deleted successfully.');
    }
}
