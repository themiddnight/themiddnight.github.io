const frontendApiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

// User API
export async function fetchUser() {
  try {
    const response = await fetch(`${apiUrl}/user?key=${frontendApiKey}`, {
      headers: {
        "Authorization": localStorage.getItem("token"),
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
      const data = responseJson;
      return data;
    } else {
      throw responseJson.message;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function updateUser(field, value, email) { // field: name or email
  try {
    const response = await fetch(`${apiUrl}/user/${field}?key=${frontendApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({ [field]: value, original_email: email }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson.message);
      return responseJson.message;
    } else {
      throw responseJson.message;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function sendResetPassword(email) {
  try {
    const response = await fetch(`${apiUrl}/auth/send-reset-password?key=${frontendApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson.message);
      return responseJson.message;
    } else {
      throw new Error("Failed to reset password");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function sendVerificationEmail(email) {
  try {
    const response = await fetch(`${apiUrl}/auth/send-verification-email?key=${frontendApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({ email }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson.message);
      return responseJson.message;
    } else {
      throw new Error("Failed to resend verification email");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function deleteUser(password) {
  try {
    const response = await fetch(`${apiUrl}/user?key=${frontendApiKey}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({ password }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson.message);
      return responseJson.message;
    } else {
      console.error(responseJson.message);
      throw responseJson.message;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// Resume API
export async function fetchResumeData(resumeId) {
  try {
    const response = await fetch(`${apiUrl}/resume/${resumeId}?key=${frontendApiKey}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const responseJson = await response.json();
      throw new Error(responseJson.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// Resume data API
export async function fetchResumeSummary(resumeId) {
  try {
    const response = await fetch(`${apiUrl}/resume/${resumeId}/summary?key=${frontendApiKey}`, {
      headers: {
        "Authorization": localStorage.getItem("token"),
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson;
    } else {
      throw responseJson.message;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function createResume(resumeName = "[New Resume]", resumeId = null) {
  try {
    const response = await fetch(`${apiUrl}/resume?key=${frontendApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({ 
        resume_name: resumeName,
        resume_id: resumeId,
      }),
    });
    const responseJson = await response.json();
    if (response.status === 401) {
      window.location.href = "/#/login";
      return;
    }
    else if (response.ok) {
      console.log("Resume created successfully")
      return responseJson.message;
    } else {
      throw responseJson.message;
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function updateResume(resumeId, data) {
  try {
    const response = await fetch(`${apiUrl}/resume/${resumeId}?key=${frontendApiKey}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (response.status === 401) {
      window.location.href = "/#/login";
      return;
    }
    else if (response.ok) {
      console.log("Resume updated successfully");
      return responseJson.message;
    } else {
      throw new Error("Failed to update resume");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function deleteResume(resumeId) {
  try {
    const response = await fetch(`${apiUrl}/resume/${resumeId}?key=${frontendApiKey}`, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem("token"),
      },
    });
    const responseJson = await response.json();

    if (response.status === 401) {
      window.location.href = "/#/login";
      return;
    }
    else if (response.ok) {
      console.log("Resume deleted successfully");
      return responseJson.message;
    } else {
      throw new Error("Failed to delete resume");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function fetchResumeSectionData(resumeId, section) { // profile, about, education etc.
  try {
    const response = await fetch(`${apiUrl}/edit/${resumeId}/${section}?key=${frontendApiKey}`, {
      headers: {
        "Authorization": localStorage.getItem("token"),
      },
    });
    if (response.status === 401) {
      window.location.href = "/#/login";
      return;
    }
    else if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Failed to fetch ${section}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function updateResumeSectionData(resumeId, section, data) {
  try {
    const response = await fetch(`${apiUrl}/edit/${resumeId}/${section}?key=${frontendApiKey}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (response.status === 401) {
      window.location.href = "/#/login";
      return;
    }
    else if (response.ok) {
      console.log("Server: ", responseJson.message);
      console.log(`${section} saved successfully`);
      return responseJson.message;
    } else {
      console.error("Server: ", responseJson.message);
      throw new Error(responseJson.message);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

// Public Notes API
export async function fetchNewNotes(resumeId) {
  try {
    const response = await fetch(`${apiUrl}/public_notes/${resumeId}/public_notes?key=${frontendApiKey}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch notes");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function postNewNote(resumeId, text) {
  try {
    const response = await fetch(`${apiUrl}/public_notes/${resumeId}/public_notes?key=${frontendApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    throw new Error(error);
  }
}

export async function deleteNote(resumeId, id) {
  try {
    const response = await fetch(`${apiUrl}/public_notes/${resumeId}/public_notes/${id}?key=${frontendApiKey}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Note deleted successfully");
    } else {
      throw new Error("Failed to delete note");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
