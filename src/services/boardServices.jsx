import { getUserIdFromToken } from "../utils/auth";
const API_URL = "https://otaviosx.cheetah-bull.ts.net/api";

export const fetchBoards = async () => {
    try {
      const userId = getUserIdFromToken();
      
      const url = userId
        ? `${API_URL}/boards?userId=${userId}`
        : `${API_URL}/boards`;

      const response = await fetch(url);

      if (!response.ok) throw new Error("Erro ao buscar boards");
  
      const boardsdata = await response.json();
      const finalDate = boardsdata.rows[0]?.finalDate;
        return boardsdata.rows;
    } catch (error) {
      console.error("Erro ao buscar boards:", error);
    }
  };
    // ========================
  // CRIAR COLUMN
  export async function createNewColumn(props) {
   const { boardId, refreshBoard } = props;
      const title = window.prompt("Digite o nome da nova column:");
    if (!title) return;

    try {
      const response = await fetch(`${API_URL}/columns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, board_id: boardId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Column "${data.column.title}" criada!`);
        refreshBoard(); 
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // ========================
  // DELETAR COLUMN
 export async function deleteColumn(columnId, refreshBoard) {
    try {
      const response = await fetch(
        `${API_URL}/columns/${columnId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Column deletada!");
        refreshBoard(); 
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  }
//============ Atualiza date finalda sprint ===============
   export async function updateSprintEnd(finalDate, boardId) {
    try {
      const response = await fetch(
        `${API_URL}/boards/${boardId}/${finalDate}`,
        {
          method: "update",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Data final da sprint atualizada!");
        refreshBoard(); 
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  }


