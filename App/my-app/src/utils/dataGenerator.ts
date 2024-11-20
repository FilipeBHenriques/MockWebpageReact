import axios from 'axios';

// Helper function to fetch random cities
const fetchRandomCities = async (count: number): Promise<string[]> => {
  //const apiKey = "YOUR_GEODB_API_KEY"; // Get an API key from GeoDB
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=${count}`;

  const options = {
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.data.map((city: { name: string }) => city.name);
  } catch (error) {
    console.error("Error fetching random cities:", error);
    return Array(count).fill("Unknown City");
  }
};

// Helper function to generate a random string of letters
const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};



// Helper function to generate a random string of digits
const generateRandomDigits = (length: number): string => {
  const digits = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return result;
};

// Helper function to generate a random name
const generateRandomName = (minLength: number = 5, maxLength: number = 10): string => {
  const nameLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  return generateRandomString(nameLength);
};

// Function to generate a random activity name (e.g., A321)
const generateRandomActivityName = (): string => {
  return `A${Math.floor(Math.random() * 900) + 100}`;  // Generate a number between 100 and 999
};

// Function to generate a random workstation ID (e.g., PTxyz123456)
const generateRandomWorkstationId = (): string => {
  const prefix = 'PT';
  const letters = 'XYZ';
  const randomLetters = generateRandomString(3).split('').map(letter => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
  const randomDigits = generateRandomDigits(2);  // 2 digits at the end
  const randomString = randomLetters + randomDigits + generateRandomDigits(5);  // Append random digits to the letters
  return prefix + randomString;
};

// Function to generate random data
export const generateRandomData = async (
  numRegions: number,
  numSites: number,
  numActivities: number,
  numWorkstations: number
) => {
  // Generate random region names using the generateRandomName function
  const regions = [];

  for (let r = 0; r < numRegions; r++) {
    const regionName = `${generateRandomName()} Region`;
    const sites = [];

    for (let s = 0; s < numSites; s++) {
      const siteName = generateRandomName(); // Generate random site name
      const activities = [];

      for (let a = 0; a < numActivities; a++) {
        const activityName = generateRandomActivityName(); // Generate random activity name
        const workstations = [];

        for (let w = 0; w < numWorkstations; w++) {
          const workstationId = generateRandomWorkstationId(); // Generate random workstation ID
          workstations.push({ id: workstationId });
        }

        activities.push({ name: activityName, workstations });
      }

      sites.push({ name: siteName, activities });
    }

    regions.push({ name: regionName, sites });
  }

  return regions;
};

// Export an empty object to make this file a module
export {};
