<?php

namespace App\Policies;

use App\Models\Mine;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MinePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Mine $mine): bool
    {
        return $user->id === $mine->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Mine $mine): bool
    {
        return $user->id === $mine->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Mine $mine): bool
    {
        return $user->id === $mine->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Mine $mine): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Mine $mine): bool
    {
        return false;
    }
}
