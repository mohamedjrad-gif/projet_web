<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user
        $user = User::create([
            'name' => 'Utilisateur Test',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        // Create sample notes for the test user
        Note::create([
            'title' => 'Bienvenue dans NoteApp',
            'content' => 'Ceci est votre première note. Vous pouvez la modifier ou la supprimer à tout moment.',
            'priority' => 'haute',
            'user_id' => $user->id,
        ]);

        Note::create([
            'title' => 'Liste de courses',
            'content' => "- Pain\n- Lait\n- Œufs\n- Fromage\n- Fruits",
            'priority' => 'moyenne',
            'user_id' => $user->id,
        ]);

        Note::create([
            'title' => 'Idées de projet',
            'content' => 'Explorer les nouvelles fonctionnalités de React 18 et Laravel 11 pour le prochain projet.',
            'priority' => 'basse',
            'user_id' => $user->id,
        ]);

        Note::create([
            'title' => 'Réunion importante',
            'content' => 'Préparer la présentation pour la réunion de lundi. Ne pas oublier les slides.',
            'priority' => 'haute',
            'user_id' => $user->id,
        ]);

        Note::create([
            'title' => 'Notes de cours',
            'content' => 'Revoir le chapitre 5 sur les design patterns et les principes SOLID.',
            'priority' => 'moyenne',
            'user_id' => $user->id,
        ]);
    }
}
