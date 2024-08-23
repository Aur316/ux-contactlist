import axios from "axios";

export const deleteContact = async (id: number): Promise<void> => {
  try {
    await axios.delete(`/api/contact`, {
      params: { id: id },
    });
    console.log(`Contact with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting contact with id ${id}:`, error);
    throw new Error("Failed to delete contact");
  }
};
