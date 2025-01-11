const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

export const fetchKickstarterData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
