<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\TestRide;
use App\Models\DealerApplication;

class FrontendController extends Controller
{
    public function index()
    {
        $products = Product::with(['colors', 'specifications', 'features'])->get();

        return Inertia::render('Home', [
            'dbProducts' => $products,
        ]);
    }

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
        ]);

        TestRide::create([
            'full_name' => $validated['full_name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'city' => $validated['city'],
            'model_id' => $validated['model_id'],
            'ride_date' => $validated['ride_date'],
            'need_finance' => $validated['need_finance'] ?? false,
            'status' => 'pending',
        ]);

        return response()->json(['success' => true, 'message' => 'Product booking requested successfully!']);
    }

    public function storeDealerApplication(Request $request)
    {
        $validated = $request->validate([
            'business_name' => 'required|string|max:255',
            'contact_person' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'city' => 'required|string|max:100',
            'showroom_space' => 'nullable|string|max:100',
        ]);

        DealerApplication::create($validated);

        return response()->json(['success' => true, 'message' => 'Dealer application submitted successfully!']);
    }
}
