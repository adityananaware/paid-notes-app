export function NoteCard({ note, onAddToCart, inCart }) {
  return (
    <div className="border rounded-lg p-4 shadow mb-4">
      <h3 className="font-bold text-lg">{note.title}</h3>
      <p className="text-gray-700">{note.description}</p>
      <p className="text-green-600 font-semibold">${note.price}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded mt-2"
        onClick={() => onAddToCart(note)}
        disabled={inCart}
      >
        {inCart ? "In Cart" : "Add to Cart"}
      </button>
    </div>
  );
}