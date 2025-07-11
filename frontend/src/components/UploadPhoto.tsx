'use client';

import { useState, useCallback } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { useLupimonStore } from '@/store/useStore';
import { Upload, X, Camera, AlertCircle } from 'lucide-react';

const UploadPhoto = () => {
  const { dogPhoto, setDogPhoto, clearDogPhoto } = useLupimonStore();
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('El archivo es demasiado grande. Máximo 5MB.');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Solo se permiten archivos de imagen (JPG, PNG, WEBP).');
      } else {
        setError('Error al subir el archivo. Inténtalo de nuevo.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setDogPhoto(file);
    }
  }, [setDogPhoto]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const handleRemovePhoto = () => {
    clearDogPhoto();
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sube una foto de tu perro salchicha
        </h2>
        <p className="text-gray-600">
          Cuanto más clara y frontal sea la foto, mejor será el resultado
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {/* Photo Preview */}
      {dogPhoto.preview ? (
        <div className="mb-6">
          <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={dogPhoto.preview}
              alt="Foto del perro"
              className="w-full h-64 object-cover"
            />
            <button
              onClick={handleRemovePhoto}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              aria-label="Eliminar foto"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-green-600 font-medium">
              ✅ Foto subida correctamente
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {dogPhoto.file?.name}
            </p>
          </div>
        </div>
      ) : (
        /* Upload Area */
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              {isDragActive ? (
                <Upload className="h-8 w-8 text-blue-500" />
              ) : (
                <Camera className="h-8 w-8 text-gray-400" />
              )}
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragActive ? 'Suelta la foto aquí' : 'Arrastra y suelta tu foto aquí'}
              </p>
              <p className="text-gray-500 mb-4">
                o haz clic para seleccionar un archivo
              </p>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <p>Formatos soportados: JPG, PNG, WEBP</p>
              <p>Tamaño máximo: 5MB</p>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      {!dogPhoto.preview && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">💡 Consejos para mejores resultados:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Usa una foto frontal del perro</li>
            <li>• Asegúrate de que esté bien iluminado</li>
            <li>• Evita fotos borrosas o muy pequeñas</li>
            <li>• El perro debe ser el protagonista de la imagen</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadPhoto;
