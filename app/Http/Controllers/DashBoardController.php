<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashBoardController extends Controller
{
    public function dashboard(){
        $pageInfo = [
            'title' => "Home",
            'slug' => "home",
            'breadcrumb' => [['link' => "/", 'name' => "Home"], ['link' => "javascript:void(0)", 'name' => "Pages"], ['name' => "Blank Page"]],
        ];

        return view('dashboard', compact('pageInfo'));
    }
}
