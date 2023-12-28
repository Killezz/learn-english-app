import { useState } from "react";
import { useEffect } from "react";
import "../components/EditTranslationPairs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditTranslationPairs = () => {
  // Creates table from database translation pairs. Allows editing finnish and english words. Also deleting and adding new pairs.
  const [translationPairs, setTranslationPairs] = useState([]);
  const [newPairEnglishValue, setNewPairEnglishValue] = useState();
  const [newPairFinnishValue, setNewPairFinnishValue] = useState();

  const handleValueChange = (pairId, e, oldValue, propertyName) => {
    // When input value changes it compares it to old and if it changed it calls changePropertyValue function to update this value in database.
    const newValue = e.target.value.trim();
    if (oldValue && oldValue != newValue) {
      changePropertyValue(pairId, propertyName, newValue);
    }
  };

  const addNewTranslationPair = () => {
    // Makes POST request to database with english and finnish words. When request was successful it reloads translations.
    const newTranslationPairData = {
      english: newPairEnglishValue,
      finnish: newPairFinnishValue,
    };
    fetch(`http://localhost/api/translations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTranslationPairData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error adding translation pair status: ${response.status}`
          );
        }
        console.log(`Translation pair added successfully!`);
        return response.json();
      })
      .then(() => {
        fetch("http://localhost/api/translations")
          .then((response) => response.json())
          .then((pairs) => {
            setTranslationPairs(pairs);
            const inputFields = document.querySelectorAll(".new-word-input");
            if (inputFields) {
              inputFields.forEach((inputField) => {
                inputField.value = "";
              });
            }
          })
          .catch((error) =>
            console.error("Error fetching translation pairs:", error)
          );
      })
      .catch((error) => {
        console.error("Error adding translation pair status: ", error.message);
      });
  };

  const changePropertyValue = (pairId, propertyName, newValue) => {
    // Handles all editing to translation pairs. Must be given pairId, propertyName to change, and new value.
    fetch(`http://localhost/api/translations/${pairId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [propertyName]: newValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error updating translation pair status: ${response.status}`
          );
        }
        console.log(
          `Translation pair ${propertyName} value updated successfully!`
        );
        return response.json();
      })
      .then(() => {
        setTranslationPairs((prevPairs) =>
          prevPairs.map((pair) =>
            pair.id === pairId ? { ...pair, [propertyName]: newValue } : pair
          )
        ); // This updates translation pairs by changing property to its new value.
      })
      .catch((error) => {
        console.error(
          "Error updating translation pair status: ",
          error.message
        );
      });
  };

  const deletePair = (pairId) => {
    // Handles translation pair deleting by id.
    fetch(`http://localhost/api/translations/${pairId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error deleting translation pair status: ${response.status}`
          );
        }
        console.log(`Pair ${pairId} deleted successfully!`);
        return response.json();
      })
      .then(() => {
        setTranslationPairs((prevPairs) =>
          prevPairs.filter((pair) => pair.id !== pairId)
        );
      })
      .catch((error) => {
        console.error(
          "Error deleting translation pair status: ",
          error.message
        );
      });
  };

  useEffect(() => {
    fetch("http://localhost/api/translations")
      .then((response) => response.json())
      .then((pairs) => {
        setTranslationPairs(pairs);
      })
      .catch((error) =>
        console.error("Error fetching translation pairs:", error)
      );
  }, []);

  return (
    <>
      <div className="edit-translations">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>English</th>
              <th>Finnish</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {translationPairs.map((pair, index) => (
              <tr key={pair.id}>
                <td>{index + 1}</td>
                <td>
                  <input
                    defaultValue={pair.english}
                    onBlur={(e) =>
                      handleValueChange(pair.id, e, pair.english, "english")
                    }
                    type="text"
                    className="word-input"
                    aria-label="edit english translation input"
                  />
                </td>
                <td>
                  <input
                    defaultValue={pair.finnish}
                    onBlur={(e) =>
                      handleValueChange(pair.id, e, pair.finnish, "finnish")
                    }
                    type="text"
                    className="word-input"
                    aria-label="edit finnish translation input"
                  />
                </td>
                <td className="delete-field">
                  <button
                    className={"pair-action-btn"}
                    onClick={() => deletePair(pair.id)}
                    aria-label="delete translation button"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td>-</td>
              <td>
                <input
                  onChange={(e) =>
                    setNewPairEnglishValue(e.target.value.trim())
                  }
                  type="text"
                  className="new-word-input"
                  aria-label="new english translation input"
                />
              </td>
              <td>
                <input
                  onChange={(e) =>
                    setNewPairFinnishValue(e.target.value.trim())
                  }
                  type="text"
                  className="new-word-input"
                  aria-label="new finnish translation input"
                />
              </td>
              <td className="add-new">
                <button
                  className={"pair-action-btn"}
                  onClick={() => addNewTranslationPair()}
                  aria-label="add new translation button"
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EditTranslationPairs;
