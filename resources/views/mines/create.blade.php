@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h4 class="mb-0">Yeni 3D Maden Oluştur</h4>
                </div>
                <div class="card-body">
                    <form action="{{ route('mines.store') }}" method="POST">
                        @csrf
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Maden Adı *</label>
                                    <input type="text" class="form-control @error('name') is-invalid @enderror" 
                                           id="name" name="name" value="{{ old('name') }}" required>
                                    @error('name')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="status" class="form-label">Durum *</label>
                                    <select class="form-select @error('status') is-invalid @enderror" id="status" name="status" required>
                                        <option value="">Durum Seçin</option>
                                        <option value="planning" {{ old('status') !== 'planning' ? 'selected' : '' }}>Planlama</option>
                                        <option value="active" {{ old('status') === 'active' ? 'selected' : '' }}>Aktif</option>
                                        <option value="inactive" {{ old('status') === 'inactive' ? 'selected' : '' }}>Pasif</option>
                                        <option value="completed" {{ old('status') === 'completed' ? 'selected' : '' }}>Tamamlandı</option>
                                    </select>
                                    @error('status')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="description" class="form-label">Açıklama</label>
                            <textarea class="form-control @error('description') is-invalid @enderror" 
                                      id="description" name="description" rows="3">{{ old('description') }}</textarea>
                            @error('description')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="location" class="form-label">Konum</label>
                            <input type="text" class="form-control @error('location') is-invalid @enderror" 
                                   id="location" name="location" value="{{ old('location') }}" 
                                   placeholder="Örn: Ankara, Türkiye">
                            @error('location')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="latitude" class="form-label">Enlem (Latitude)</label>
                                    <input type="number" class="form-control @error('latitude') is-invalid @enderror" 
                                           id="latitude" name="latitude" value="{{ old('latitude') }}" 
                                           step="0.00000001" min="-90" max="90"
                                           placeholder="39.9334">
                                    @error('latitude')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="longitude" class="form-label">Boylam (Longitude)</label>
                                    <input type="number" class="form-control @error('longitude') is-invalid @enderror" 
                                           id="longitude" name="longitude" value="{{ old('longitude') }}" 
                                           step="0.00000001" min="-180" max="180"
                                           placeholder="32.8597">
                                    @error('longitude')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-info">
                            <h6><i class="fas fa-info-circle"></i> Bilgi</h6>
                            <p class="mb-0">
                                Maden oluşturulduktan sonra 3D görünümde katmanlar ve modeller ekleyebilirsiniz. 
                                Konum bilgileri opsiyoneldir ve harita entegrasyonu için kullanılabilir.
                            </p>
                        </div>

                        <div class="d-flex justify-content-between">
                            <a href="{{ route('mines.index') }}" class="btn btn-secondary">
                                <i class="fas fa-arrow-left"></i> Geri Dön
                            </a>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-plus"></i> Maden Oluştur
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Location input için autocomplete özelliği eklenebilir
    const locationInput = document.getElementById('location');
    
    // Eğer kullanıcı konum girerse, otomatik olarak koordinatları almaya çalış
    locationInput.addEventListener('blur', function() {
        // Bu özellik Google Maps API ile geliştirilebilir
        console.log('Location changed:', this.value);
    });
});
</script>
@endsection
