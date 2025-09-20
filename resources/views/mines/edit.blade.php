@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h4 class="mb-0">{{ $mine->name }} - Düzenle</h4>
                </div>
                <div class="card-body">
                    <form action="{{ route('mines.update', $mine) }}" method="POST">
                        @csrf
                        @method('PUT')
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Maden Adı *</label>
                                    <input type="text" class="form-control @error('name') is-invalid @enderror" 
                                           id="name" name="name" value="{{ old('name', $mine->name) }}" required>
                                    @error('name')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="mb-3">
                                    <label for="status" class="form-label">Durum *</label>
                                    <select class="form-select @error('status') is-invalid @enderror" 
                                            id="status" name="status" required>
                                        <option value="">Durum Seçin</option>
                                        <option value="planning" {{ old('status', $mine->status) === 'planning' ? 'selected' : '' }}>Planlama</option>
                                        <option value="active" {{ old('status', $mine->status) === 'active' ? 'selected' : '' }}>Aktif</option>
                                        <option value="inactive" {{ old('status', $mine->status) === 'inactive' ? 'selected' : '' }}>Pasif</option>
                                        <option value="completed" {{ old('status', $mine->status) === 'completed' ? 'selected' : '' }}>Tamamlandı</option>
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
                                      id="description" name="description" rows="3">{{ old('description', $mine->description) }}</textarea>
                            @error('description')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="mb-3">
                            <label for="location" class="form-label">Konum</label>
                            <input type="text" class="form-control @error('location') is-invalid @enderror" 
                                   id="location" name="location" value="{{ old('location', $mine->location) }}" 
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
                                           id="latitude" name="latitude" value="{{ old('latitude', $mine->latitude) }}" 
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
                                           id="longitude" name="longitude" value="{{ old('longitude', $mine->longitude) }}" 
                                           step="0.00000001" min="-180" max="180"
                                           placeholder="32.8597">
                                    @error('longitude')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <!-- Mine Statistics -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">{{ $mine->layers->count() }}</h5>
                                        <p class="card-text text-muted">Katman</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card bg-light">
                                    <div class="card-body text-center">
                                        <h5 class="card-title">{{ $mine->models->count() }}</h5>
                                        <p class="card-text text-muted">3D Model</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="alert alert-info mt-3">
                            <h6><i class="fas fa-info-circle"></i> Bilgi</h6>
                            <p class="mb-2">
                                <strong>Oluşturulma:</strong> {{ $mine->created_at->format('d.m.Y H:i') }}<br>
                                <strong>Son Güncelleme:</strong> {{ $mine->updated_at->format('d.m.Y H:i') }}
                            </p>
                            <p class="mb-0">
                                Katman ve model verilerini değiştirmek için 3D görünümü kullanın.
                                <a href="{{ route('mines.show', $mine) }}" class="alert-link">3D Görünüme Git</a>
                            </p>
                        </div>

                        <div class="d-flex justify-content-between">
                            <div>
                                <a href="{{ route('mines.index') }}" class="btn btn-secondary me-2">
                                    <i class="fas fa-arrow-left"></i> Listeye Dön
                                </a>
                                <a href="{{ route('mines.show', $mine) }}" class="btn btn-info">
                                    <i class="fas fa-cube"></i> 3D Görünüm
                                </a>
                            </div>
                            <div>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save"></i> Değişiklikleri Kaydet
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Danger Zone -->
            <div class="card mt-4 border-danger">
                <div class="card-header bg-danger text-white">
                    <h6 class="mb-0"><i class="fas fa-exclamation-triangle"></i> Tehlikeli İşlemler</h6>
                </div>
                <div class="card-body">
                    <p class="text-muted mb-3">
                        Bu işlem geri alınamaz. Maden ve tüm ilişkili veriler (katmanlar, modeller) kalıcı olarak silinecektir.
                    </p>
                    <form action="{{ route('mines.destroy', $mine) }}" method="POST" class="d-inline" 
                          onsubmit="return confirm('Bu madeni ve tüm verilerini kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger">
                            <i class="fas fa-trash"></i> Madeni Sil
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
