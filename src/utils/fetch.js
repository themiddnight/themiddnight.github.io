const apiKey = import.meta.env.VITE_API_KEY;
const userId = import.meta.env.VITE_USER_ID;
const apiUrl = import.meta.env.VITE_API_URL;

async function fetchData() {
  return fetch(`${apiUrl}/${userId}/data`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function fetchNewNotes(limit = 50, offset = 0) {
  return fetch(`${apiUrl}/${userId}/public_notes?limit=${limit}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function postNewNote(text) {
  return fetch(`${apiUrl}/${userId}/public_notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ content: text }),
    })
    .then((res) => res.json())
    .then((data) => {
      return data.id;
    }).catch((err) => {
      console.error(err);
    });
}

async function deleteNote(id) {
  return fetch(`${apiUrl}/${userId}/public_notes/${id}`, {
    method: "DELETE",
    headers: {
      "authorization": `Bearer ${apiKey}`,
    },
  }).then((res) => {
    return res;
  }).catch((err) => {
    console.error(err);
  });
}

export { fetchData, fetchNewNotes, postNewNote, deleteNote };