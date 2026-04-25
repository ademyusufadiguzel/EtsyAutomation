export function FileUploader({ onFile, fileName }) {
  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) onFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors cursor-pointer"
    >
      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={handleChange}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer block">
        {fileName ? (
          <p className="text-green-600 font-medium">{fileName} yuklendi</p>
        ) : (
          <>
            <p className="text-gray-600 font-medium">inventory.xlsx dosyasini surukle veya tikla</p>
            <p className="text-gray-400 text-sm mt-1">.xlsx veya .csv desteklenir</p>
          </>
        )}
      </label>
    </div>
  )
}
