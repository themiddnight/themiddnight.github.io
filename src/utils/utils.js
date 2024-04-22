/**
 * Convert date to a specific format
 * @param {string} date - Date string
 * @param {boolean} day - Include day
 * @param {boolean} long - Long month
 * @returns {string} - Formatted date
 */
export function convertDate(date, day = false, long = false) {
  if (!date) return "";
  const dateOutput = new Date(date).toLocaleDateString("en-US", {
    month: long ? "long" : "short",
    year: "numeric",
    day: day ? "numeric" : undefined,
  });
  return dateOutput;
}


/**
 * Sort data by date
 * @param {Array} data - Array of objects
 * @param {string} attr - Date attribute
 * @param {boolean} desc - Descending order
 * @returns {Array} - Sorted array
 */
export function sortByDate(data, attr = "to", desc = true) {
  return data.sort((a, b) => {
    if (a.current) {
      return desc ? -1 : 1;
    } else if (b.current) {
      return desc ? 1 : -1;
    } else {
      return desc
        ? new Date(b[attr]) - new Date(a[attr])
        : new Date(a[attr]) - new Date(b[attr]);
    }
  });
}


/**
 * Get relative time from a timestamp
 * @param {Object} timestamp - Firestore timestamp object
 * @returns {string} - Relative time
 */
export function getRelativeTime(timestamp) {
  const date = new Date(timestamp._seconds * 1000);
  const now = new Date();
  const diff = now - date;

  if (diff < 1000 * 60) {
    return "Just now";
  } else if (diff < 1000 * 60 * 60) {
    const min = Math.floor(diff / (1000 * 60));
    return `${min} ${min === 1 ? "min." : "mins."}`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hour = Math.floor(diff / (1000 * 60 * 60));
    return `${hour} ${hour === 1 ? "hr." : "hrs."}`;
  } else if (diff < 1000 * 60 * 60 * 24 * 7) {
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${day} ${day === 1 ? "day" : "days"}`;
  } else if (diff < 1000 * 60 * 60 * 24 * 30) {
    const week = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    return `${week} ${week === 1 ? "week" : "weeks"}`;
  } else if (diff < 1000 * 60 * 60 * 24 * 365) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }
}


/**
 * Resize image to a specific size
 * @param {File} file - Image file
 * @param {number} size - Target size of the shorter side in pixels
 * @returns {Promise<string>} - Resized image as base64 string
 */
export function resizeImage(file, size = 512) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = function () {
        let width = img.width;
        let height = img.height;

        if (file.type === "image/svg+xml") {
          resolve(event.target.result);
        } 
        else {
          if (width > height) {
            if (height > size) {
              width *= size / height;
              height = size;
            }
          } else {
            if (width > size) {
              height *= size / width;
              width = size;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL("image/jpeg"));
        }
      };
      img.onerror = function (error) {
        reject(error);
      };
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
}

// 

/**
 * @param {object} data 
 * @param {function} setData
 * @param {string} dataName 
 * @param {number} index 
 * @param {number} direction 
 */
export function handleMoveField(data, setData, dataName, index, direction) {
  const newIndex = index + direction;
  const newData = [...data[dataName]];
  if (newIndex >= 0 && newIndex < newData.length) {
    const temp = newData[index];
    newData[index] = newData[newIndex];
    newData[newIndex] = temp;
    setData({ ...data, [dataName]: newData });
  }
}

/**
 * @param {object} data 
 * @param {function} setData 
 * @param {string} dataName 
 * @param {object} fields 
 * @param {string} position
 */
export function handleAddData(data, setData, dataName, fields, position = "top") {
  let newData;
  if (position === "top") newData = [{...fields}, ...data[dataName]];
  else if (position === "bottom") newData = [...data[dataName], {...fields}];
  setData({ ...data, [dataName]: newData });
}

/**
 * @param {function} setData 
 * @param {string} dataName 
 * @param {number} index 
 */
export function handleDeleteData(setData, dataName, index) {
  const confirm = window.confirm(`Are you sure you want to delete this data?`);
  if (!confirm) return;
  setData(prevData => {
    const newData = [...prevData[dataName]];
    newData.splice(index, 1);
    return {
      ...prevData,
      [dataName]: newData,
      deleted_image_paths: prevData.deleted_image_paths
        ? [...prevData.deleted_image_paths, prevData[dataName][index].image_path]
        : [prevData[dataName][index].image_path]
    }
  })
}

/**
 * @param {object} data 
 * @param {function} setData 
 * @param {string} dataName 
 * @param {number} index 
 * @param {string} key 
 * @param {*} value 
 */
export function handleDataChange(data, setData, dataName, index, key, value) {
  const newData = [...data[dataName]];
  newData[index][key] = value;
  setData({ ...data, [dataName]: newData });
}

/**
 * @param {object} data 
 * @param {function} setData 
 * @param {string} dataName 
 * @param {number} index 
 * @param {string} key 
 * @param {*} value 
 */
export function handleMultilineChange(data, setData, dataName, index, key, value) {
  const newData = [...data[dataName]];
  const valueArray = value.split("\n");
  newData[index][key] = valueArray.map((content) => ({ content }));
  setData({ ...data, [dataName]: newData });
}

/**
 * @param {object} data 
 * @param {function} setData 
 * @param {string} dataName 
 * @param {number} index 
 * @param {File} file
 */
export function handleDataImageChange(data, setData, dataName, index, file) {
  const newData = [...data[dataName]];
  if (file) {
    newData[index].image_file = file;
    newData[index].image_url = URL.createObjectURL(file);
    setData({ ...data, [dataName]: newData });
  } else {
    newData[index].image_file = null;
    newData[index].image_url = newData[index].image_url_original;
    setData({ ...data, [dataName]: newData });
  }
}

//