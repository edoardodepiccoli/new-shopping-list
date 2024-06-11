import "./App.css";
import { Header } from "./Header";
import { List } from "./List";
import { Form } from "./Form";
import { DeleteSection } from "./DeleteSection";
import { v4 as uuid } from "uuid";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { useEffect, useState } from "react";
const firebaseConfig = {
  databaseURL:
    "https://new-shopping-list-83fbf-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function App() {
  const [items, setItems] = useState({});

  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setItems(data);
      } else {
        console.log("no snapshot");
        setItems({});
      }
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
    remove(ref(database, "items/"));
  }

  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <div>
          <Header></Header>
          <Form addItem={addItem}></Form>
          <List items={items} toggleChecked={toggleChecked}></List>
        </div>
        <DeleteSection deleteAll={deleteAll}></DeleteSection>
      </div>
    </>
  );
}

export default App;
