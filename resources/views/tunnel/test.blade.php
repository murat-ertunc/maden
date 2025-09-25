@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1><i class="fas fa-flask"></i> Tunnel Designer Test Sistemi</h1>
            <p class="text-muted">GoJS Tunnel Designer modülünün test ve debugging platformu</p>
        </div>
        <a href="{{ route('tunnel.index') }}" class="btn btn-primary">
            <i class="fas fa-arrow-left"></i> Ana Sisteme Dön
        </a>
    </div>
    
    <iframe src="/tunnel-test.html" width="100%" height="800px" frameborder="0" style="border-radius: 0.375rem; box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);"></iframe>
</div>
@endsection