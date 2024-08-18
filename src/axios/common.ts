import { FileUploadSchemaType } from "../zod/schema";
import apiClient from "./apiClient";

const poll = (
  interval: number,
  times: number,
  type: "image" | "video",
  data: FileUploadSchemaType,
): Promise<void> => {
  return new Promise((resolve) => {
    let count = 0;
    const maxCount = times;

    const pollRequest = async () => {
      try {
        const response = await apiClient.post(`/poll/${type}`, data);
        if (response.status === 200) {
          console.log("Polling successful, stopping.");
          return resolve(); // Resolve the promise when polling is successful
        }
      } catch (error) {
        console.error("Error during polling:", error);
      }

      count++;
      if (count < maxCount) {
        setTimeout(pollRequest, interval);
      } else {
        console.log("Max polling attempts reached, stopping.");
        resolve();
      }
    };

    pollRequest();
  });
};

export { poll };
