import { useRef } from 'react'
import { useApp } from '../../context/AppContext'

export function RowImageUpload({ product }) {
  const { getImage, addImages } = useApp()
  const inputRef = useRef(null)
  const entry = getImage(product.image_name)

  return (
    <div className="flex items-center">
      {entry ? (
        <img
          src={entry.objectURL}
          alt={product.title}
          className="w-10 h-10 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => inputRef.current?.click()}
          title="Degistirmek icin tikla"
        />
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400 text-sm font-bold hover:border-orange-400 hover:text-orange-400 transition-colors"
          title={product.image_name || 'Gorsel ekle'}
        >
          +
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) addImages(e.target.files)
        }}
      />
    </div>
  )
}
