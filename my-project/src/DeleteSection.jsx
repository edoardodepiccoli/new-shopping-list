export function DeleteSection({ deleteAll }) {
  return (
    <div className="pb-6 pt-6 bg-red-200 flex flex-col justify-center items-center mt-6">
      <button
        onClick={deleteAll}
        className="p-4 bg-white rounded-xl text-red-600 w-11/12 font-bold"
      >
        Elimina tutto🗑️
      </button>
    </div>
  );
}
