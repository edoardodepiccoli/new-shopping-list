import "./App.css";
import { Header } from "./Header";
import { List } from "./List";
import { Form } from "./Form";
import { SuggestionsList } from "./SuggestionsList";
import { DeleteSection } from "./DeleteSection";
import { v4 as uuid } from "uuid";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove, get } from "firebase/database";
import { useEffect, useState } from "react";
const firebaseConfig = {
  databaseURL:
    "https://new-shopping-list-83fbf-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [items, setItems] = useState({});
  const [itemsSuggestions, setItemsSuggestions] = useState([]);

  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      if (snapshot.exists()) {
        //set main items
        const data = snapshot.val();
        setItems(data);
      } else {
        console.log("no snapshot");
        setItems({});
      }
    });

    const itemsHistoryRef = ref(database, "itemsHistory/");
    onValue(itemsHistoryRef, (snapshot) => {
      if (snapshot.exists()) {
        //set items history (todo)
        const itemsHistoryRef = ref(database, "itemsHistory/");
        get(itemsHistoryRef).then((res) => {
          const historyData = res.val();
          //create suggestions array
          const oneWeekBefore = Date.now() - 3600 * 24 * 7 * 1000;
          const suggestionsValues = [];

          Object.entries(historyData).map(([key, value]) => {
            if (key > oneWeekBefore) {
              Object.entries(value).map(([key2, value2]) => {
                //date id name
                suggestionsValues.push([key, value2.id, value2.name]);
              });
            }
          });

          //create unique suggestion values (removing items from DB would be more efficient in the long run, I know but I'm lazy)
          const uniqueSuggestionValues = [];

          for (let i of suggestionsValues) {
            let isPresent = false;
            for (let j of suggestionsValues) {
              if (i[0] !== j[0] && i[2] === j[2]) isPresent = true;
            }
            if (!isPresent) uniqueSuggestionValues.push(i);
          }

          setItemsSuggestions(uniqueSuggestionValues);
        });
      } else console.log("no snapshot for history");
    });
  }, []);

  function addItem(name) {
    const itemId = uuid();
    set(ref(database, "items/" + itemId), {
      name: name,
      checked: false,
      id: itemId,
    });
  }

  function toggleChecked(name, checked, id) {
    set(ref(database, "items/" + id), {
      name: name,
      checked: !checked,
      id: id,
    });
  }

  function deleteAll() {
    console.log("delete function called");
    set(ref(database, "itemsHistory/" + Date.now()), items);
    remove(ref(database, "items/"));
  }

  function deleteSuggestion(dateStamp, itemID) {
    console.log("to remove: ", itemID);
    //remove from db first and then it updates automatically
    remove(ref(database, "itemsHistory/" + dateStamp + "/" + itemID)); //coding on italian keyboard so I dont have backtick
    // setItemsSuggestions(
    //   itemsSuggestions.filter((item) => item != itemToRemove)
    // );
  }

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div>
          <Header></Header>
          <Form addItem={addItem}></Form>
          <List items={items} toggleChecked={toggleChecked}></List>
          <div>
            <h2 className="mt-24 mb-2 text-center">
              Cronologia prodotti (clicca x aggiungere):
            </h2>
            <SuggestionsList
              itemsSuggestions={itemsSuggestions}
              addItem={addItem}
              deleteSuggestion={deleteSuggestion}
            ></SuggestionsList>
          </div>
        </div>
        <DeleteSection deleteAll={deleteAll}></DeleteSection>
        {/* test button */}
      </div>
    </>
  );
}

export default App;
