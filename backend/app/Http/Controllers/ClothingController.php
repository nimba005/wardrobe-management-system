<?php

namespace App\Http\Controllers;

use App\Models\Clothing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ClothingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all clothing items belonging to the authenticated user
        return response()->json(Clothing::where('user_id', Auth::id())->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'nullable|string', // Assuming image URL
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Create clothing item
        $item = Clothing::create([
            'user_id' => Auth::id(), // Assign the item to the authenticated user
            'name' => $request->name,
            'category' => $request->category,
            'image' => $request->image,
        ]);

        return response()->json($item, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = Clothing::where('user_id', Auth::id())->find($id);

        if (!$item) {
            return response()->json(['error' => 'Item not found'], 404);
        }

        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $item = Clothing::where('user_id', Auth::id())->find($id);

        if (!$item) {
            return response()->json(['error' => 'Item not found or unauthorized'], 403);
        }

        // Validate input
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
            'image' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Update clothing item
        $item->update($request->all());

        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $item = Clothing::where('user_id', Auth::id())->find($id);

        if (!$item) {
            return response()->json(['error' => 'Item not found or unauthorized'], 403);
        }

        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }
}

