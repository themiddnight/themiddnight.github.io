const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchResume(resumeId) {
  try {
    const response = await fetch(`${apiUrl}/${resumeId}/data`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch resume");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchSummaryData(resumeId) {
  try {
    const response = await fetch(`${apiUrl}/${resumeId}/summary`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch summary");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchResumeSectionData(resumeId, section) {
  try {
    const response = await fetch(`${apiUrl}/${resumeId}/edit/${section}`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch ${section}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postResumeSectionData(resumeId, section, data) {
  try {
    const response = await fetch(`${apiUrl}/${resumeId}/edit/${section}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(`${section} saved successfully`);
    } else {
      throw new Error(`${section} failed to save`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchNewNotes(resumeId) {
  try {
    const response = await fetch(`${apiUrl}/${resumeId}/public_notes`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch notes");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postNewNote(resumeId, text) {
  try {
    const response = await fetch(`${apiUrl}/${resumeId}/public_notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ content: text }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Note posted successfully");
      return data.id;
    } else {
      throw new Error("Failed to post note");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteNote(userId, id) {
  try {
    const response = await fetch(`${apiUrl}/${userId}/public_notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    if (response.ok) {
      console.log("Note deleted successfully");
    } else {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
