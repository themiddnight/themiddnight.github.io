const apiKey = "123456789";

async function fetchData() {
  return fetch("http://localhost:5002/api/_test/data")
  // return fetch("https://app-3whecoq62a-uc.a.run.app/api/MmPYSap2pjkA5pOGwiMX/data")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function fetchNewNotes(limit = 50, offset = 0) {
  return fetch(`http://localhost:5002/api/_test/public_notes?limit=${limit}&offset=${offset}`)
  // return fetch(`https://app-3whecoq62a-uc.a.run.app/api/MmPYSap2pjkA5pOGwiMX/public_notes?limit=${limit}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function postNewNote(text) {
  return fetch("http://localhost:5002/api/_test/public_notes", {
  // return fetch("https://app-3whecoq62a-uc.a.run.app/api/MmPYSap2pjkA5pOGwiMX/public_notes", {
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
  return fetch(`http://localhost:5002/api/_test/public_notes/${id}`, {
  // return fetch(`https://app-3whecoq62a-uc.a.run.app/api/MmPYSap2pjkA5pOGwiMX/public_notes/${id}`, {
    method: "DELETE",
    headers: {
      "authorization": `Bearer ${apiKey}`,
    },
  })
}

export { fetchData, fetchNewNotes, postNewNote, deleteNote };