import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    // Fetch all toys on page load (READ)
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Handle adding a new toy (CREATE)
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
    setShowForm(false);
  }

  // Handle liking a toy (UPDATE)
  function handleLikeToy(updatedToy) {
    setToys(
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  // Handle deleting a toy (DELETE)
  function handleDeleteToy(toyId) {
    setToys(toys.filter((toy) => toy.id !== toyId));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onLikeToy={handleLikeToy}
        onDeleteToy={handleDeleteToy}
      />
    </>
  );
}

export default App;
