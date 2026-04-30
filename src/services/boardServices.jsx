import { getUserIdFromToken } from "../utils/auth";
const API_URL = "https://releitura-trello-react-api-node.onrender.com";

export const fetchBoards = async () => {
    try {
      const userId = getUserIdFromToken();
      
      const url = userId
        ? `${API_URL}/boards?userId=${userId}`
        : `${API_URL}/boards`;

      const response = await fetch(url);

      if (!response.ok) throw new Error("Erro ao buscar boards");
      
      const boardsdata = await response.json();

        return boardsdata.rows;

    } catch (error) {
      console.error("Erro ao buscar boards:", error);
    }
  };

