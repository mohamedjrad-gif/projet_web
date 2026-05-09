<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{

    public function index(Request $request)
    {
        $notes = $request->user()->notes()->orderBy('created_at', 'desc')->get();

        return response()->json($notes);
    }

    /**
     * Store a newly created note.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'nullable|string',
            'priority' => 'required|in:basse,moyenne,haute',
        ]);

        $note = $request->user()->notes()->create([
            'title' => $request->title,
            'content' => $request->content,
            'priority' => $request->priority,
        ]);

        return response()->json([
            'message' => 'Note créée avec succès',
            'note' => $note,
        ], 201);
    }

    /**
     * Display the specified note.
     */
    public function show(Request $request, $id)
    {
        $note = $request->user()->notes()->findOrFail($id);

        return response()->json($note);
    }

    /**
     * Update the specified note.
     */
    public function update(Request $request, $id)
    {
        $note = $request->user()->notes()->findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'nullable|string',
            'priority' => 'required|in:basse,moyenne,haute',
        ]);

        $note->update([
            'title' => $request->title,
            'content' => $request->content,
            'priority' => $request->priority,
        ]);

        return response()->json([
            'message' => 'Note modifiée avec succès',
            'note' => $note,
        ]);
    }

    /**
     * Remove the specified note.
     */
    public function destroy(Request $request, $id)
    {
        $note = $request->user()->notes()->findOrFail($id);
        $note->delete();

        return response()->json([
            'message' => 'Note supprimée avec succès',
        ]);
    }
}
