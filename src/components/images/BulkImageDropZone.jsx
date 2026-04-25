import { useApp } from '../../context/AppContext'

export function BulkImageDropZone() {
  const { addImages } = useApp()

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files?.length) addImages(e.dataTransfer.files)
  }

  const handleChange = (e) => {
    if (e.target.files?.length) addImages(e.target.files)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-orange-400 transition-colors"
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
        id="bulk-image-input"
      />
      <label htmlFor="bulk-image-input" className="cursor-pointer block">
        <p className="text-3xl font-light text-gray-300 mb-2">+</p>
        <p className="text-gray-600 font-medium">Gorsel dosyalarini surukle veya tikla</p>
        <p className="text-gray-400 text-sm mt-1">Toplu yukleme — birden fazla dosya secebilirsiniz</p>
      </label>
    </div>
  )
}
