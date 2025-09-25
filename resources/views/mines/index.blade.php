@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h1>3D Maden Yönetimi</h1>
                <div>
                    <a href="{{ route('tunnel.index') }}" class="btn btn-success me-2">
                        <i class="fas fa-route"></i> Tunnel Designer
                    </a>
                    <a href="{{ route('mines.create') }}" class="btn btn-primary">
                        <i class="fas fa-plus"></i> Yeni Maden Oluştur
                    </a>
                </div>
            </div>

            @if(session('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('success') }}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            @endif

            @if($mines->count() > 0)
                <div class="row">
                    @foreach($mines as $mine)
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card h-100 shadow-sm">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <h5 class="card-title mb-0">{{ $mine->name }}</h5>
                                    <span class="badge badge-{{ $mine->status === 'active' ? 'success' : ($mine->status === 'planning' ? 'warning' : 'secondary') }}">
                                        {{ ucfirst($mine->status) }}
                                    </span>
                                </div>
                                
                                <div class="card-body">
                                    <p class="card-text">{{ Str::limit($mine->description, 100) }}</p>
                                    
                                    @if($mine->location)
                                        <div class="mb-2">
                                            <small class="text-muted">
                                                <i class="fas fa-map-marker-alt"></i> {{ $mine->location }}
                                            </small>
                                        </div>
                                    @endif
                                    
                                    <div class="row text-center">
                                        <div class="col-6">
                                            <div class="stat">
                                                <h6 class="mb-1">{{ $mine->layers->count() }}</h6>
                                                <small class="text-muted">Katman</small>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="stat">
                                                <h6 class="mb-1">{{ $mine->models->count() }}</h6>
                                                <small class="text-muted">3D Model</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="card-footer">
                                    <div class="btn-group w-100" role="group">
                                        <a href="{{ route('mines.show', $mine) }}" class="btn btn-primary btn-sm">
                                            <i class="fas fa-cube"></i> 3D Görünüm
                                        </a>
                                        <a href="{{ route('mines.edit', $mine) }}" class="btn btn-outline-secondary btn-sm">
                                            <i class="fas fa-edit"></i> Düzenle
                                        </a>
                                        <form action="{{ route('mines.destroy', $mine) }}" method="POST" class="d-inline" 
                                              onsubmit="return confirm('Bu madeni silmek istediğinizden emin misiniz?')">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-outline-danger btn-sm">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                
                                <div class="card-footer text-muted">
                                    <small>
                                        Oluşturulma: {{ $mine->created_at->format('d.m.Y H:i') }}
                                    </small>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

                <!-- Pagination -->
                <div class="d-flex justify-content-center">
                    {{ $mines->links() }}
                </div>
            @else
                <div class="text-center py-5">
                    <div class="mb-4">
                        <i class="fas fa-mountain fa-5x text-muted"></i>
                    </div>
                    <h3 class="text-muted">Henüz Maden Yok</h3>
                    <p class="text-muted mb-4">İlk 3D madeninizi oluşturmak için başlayın</p>
                    <a href="{{ route('mines.create') }}" class="btn btn-primary btn-lg">
                        <i class="fas fa-plus"></i> İlk Madeni Oluştur
                    </a>
                </div>
            @endif
        </div>
    </div>
</div>

<style>
.badge {
    font-size: 0.75em;
}
.badge-success { background-color: #28a745; }
.badge-warning { background-color: #ffc107; color: #212529; }
.badge-secondary { background-color: #6c757d; }

.stat h6 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #495057;
}

.card {
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-2px);
}

.btn-group .btn {
    flex: 1;
}
</style>
@endsection
