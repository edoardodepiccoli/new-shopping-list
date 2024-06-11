export function List({ items, toggleChecked }) {
  return (
    <div className="flex w-full justify-center items-center">
      <ul className="flex flex-wrap w-11/12 justify-center items-center mt-2 gap-2">
        {Object.entries(items).map(([key, value]) => {
          let checked = !value.checked
            ? "bg-slate-200"
            : "bg-red-200 line-through";
          return (
            <li
              key={value.id}
              onClick={() => toggleChecked(value.name, value.checked, value.id)}
              className={
                "pt-4 pb-4 pl-6 pr-6 flex-grow text-center rounded-xl " +
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
