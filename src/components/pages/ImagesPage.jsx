import { useApp } from '../../context/AppContext'
import { BulkImageDropZone } from '../images/BulkImageDropZone'

export function ImagesPage() {
  const { allImages, removeImage, imageVersion } = useApp()
  // imageVersion is read to ensure re-render when images change
  void imageVersion
  const images = allImages()

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Gorsel Yonetimi</h2>
        <p className="text-sm text-gray-500 mt-1">
          Urunleriniz icin gorsel dosyalarini burada yukleyin. Dosya adi, urun kayitlarindaki gorsel
          adiyla (image_name) eslesmelidir.
        </p>
      </div>

      <BulkImageDropZone />

      {images.length > 0 && (
        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">{images.length} gorsel yuklendi</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map(({ name, objectURL }) => (
              <div key={name} className="relative group">
                <img
                  src={objectURL}
                  alt={name}
                  className="w-full aspect-square object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removeImage(name)}
                  className="absolute top-1 right-1 bg-white border border-gray-200 text-gray-500 hover:text-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  x
                </button>
                <p className="text-xs text-gray-400 mt-1 truncate" title={name}>
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && (
        <p className="text-sm text-gray-400 text-center mt-8">Henuz gorsel yuklenmedi.</p>
      )}
    </div>
  )
}
