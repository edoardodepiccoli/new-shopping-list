export function SuggestionsList({
  itemsSuggestions,
  addItem,
  deleteSuggestion,
}) {
  return (
    <div className="flex w-full justify-center items-center">
      <ul className="flex flex-wrap w-11/12 justify-center items-center mt-2 gap-2">
        {itemsSuggestions.map((item, i) => {
          return (
            <li
              onClick={() => {
                addItem(item[2]);
                deleteSuggestion(item[0], item[1]);
              }}
              key={i}
              className="pt-2 pb-2 pl-4 pr-4 flex-grow text-center rounded-xl shadow-md border border-slate-400 "
            >
              {item[2]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
