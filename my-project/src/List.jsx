export function List({ items, toggleChecked }) {
  return (
    <div className="flex w-full justify-center items-center">
      <ul className="flex flex-wrap w-11/12 justify-center items-center mt-2 gap-2">
        {Object.entries(items).map(([key, value]) => {
          let checked = !value.checked ? "bg-white" : "bg-red-200 line-through";
          return (
            <li
              key={value.id}
              onClick={() => toggleChecked(value.name, value.checked, value.id)}
              className={
                "pt-2 pb-2 pl-4 pr-4 flex-grow text-center rounded-xl shadow-md border border-slate-400 " +
                checked
              }
            >
              {value.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
