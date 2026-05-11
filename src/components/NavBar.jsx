import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "https://otaviosx.cheetah-bull.ts.net/api";


function NavBar(props) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [allUsers, setAllUsers] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);


  // Buscar todos os usuários disponíveis
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        setAllUsers(data.rows || []);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }
    fetchUsers();
  }, []);

  // Buscar membros do board selecionado
  useEffect(() => {
    async function fetchBoardMembers() {
      if (!props.selectedBoardId) return;
      try {
        const response = await fetch(
          `${API_URL}/boards/${props.selectedBoardId}/users`,
        );
        const data = await response.json();
        setBoardMembers(data.rows || []);
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
      }
    }
    fetchBoardMembers();
  }, [props.selectedBoardId]);

  function onLoginClick() {
    navigate(`/login`);
  }

  function onLogoutClick() {
    sessionStorage.removeItem("token");
    navigate(`/login`);
  }

  function onHomeClick() {
    navigate(`/`);
  }

  // Criar nova board
  async function createNewBoard() {
    const title = window.prompt("Digite o nome da nova board:");
    if (!title) return;

    try {
      const userId = getUserIdFromToken();
      const response = await fetch(`${API_URL}/boards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, user_id: userId }),
      });
      const data = await response.json();

      if (response.ok) {
        window.alert(`Board "${data.board.title}" criada com sucesso!`);
        props.onBoardCreated();
      } else {
        window.alert("Erro ao criar board: " + data.error);
      }
    } catch (error) {
      window.alert("Erro ao criar board");
      console.error(error);
    }
  }

  // deleta board atual
  async function removeBoard() {
    if (!props.selectedBoardId) {
      return window.alert("Selecione uma board primeiro!");
    }

      const confirmDelete = window.confirm("Tem certeza que deseja excluir esta board?");
      if (!confirmDelete) return;
      console.log("Tentando deletar board com ID:", props.selectedBoardId);
    try {
      const response = await fetch(`${API_URL}/boards/${props.selectedBoardId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.alert("Board excluída com sucesso!");
        props.onBoardCreated(); 

      } else {
        window.alert("Erro ao remover membro");
      }
    } catch (error) {
      window.alert("Erro ao remover membro");
      console.error(error);
    }
  }

  // Adicionar membro à board atual
  async function addMemberToBoard() {
    if (!props.selectedBoardId) {
      return window.alert("Selecione uma board primeiro!");
    }

    const userIdStr = window.prompt(
      `Digite o ID do usuário para adicionar:\n`,
    );

    if (!userIdStr) return;

    const userId = parseInt(userIdStr.trim());
    if (isNaN(userId)) {
      return window.alert("ID inválido!");
    }

    try {
      const response = await fetch(`${API_URL}/user-boards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          board_id: props.selectedBoardId,
        }),
      });

      if (response.ok) {
        window.alert("Membro adicionado com sucesso!");
        // Atualiza lista de membros
        const membersRes = await fetch(
          `${API_URL}/boards/${props.selectedBoardId}/users`,
        );
        const membersData = await membersRes.json();
        setBoardMembers(membersData.rows || []);
      } else {
        window.alert("Erro ao adicionar membro");
      }
    } catch (error) {
      window.alert("Erro ao adicionar membro");
      console.error(error);
    }
  }

  // Remover membro da board atual
  async function removeMemberFromBoard() {
    if (!props.selectedBoardId) {
      return window.alert("Selecione uma board primeiro!");
    }

    if (boardMembers.length === 0) {
      return window.alert("Nenhum membro para remover!");
    }

    const memberOptions = boardMembers
      .map((m) => `ID: ${m.id} - ${m.username}`)
      .join("\n");
    const userIdStr = window.prompt(
      `Digite o ID do membro para remover:\n\n${memberOptions}`,
    );

    if (!userIdStr) return;

    const userId = parseInt(userIdStr.trim());
    if (isNaN(userId)) {
      return window.alert("ID inválido!");
    }

    try {
      const response = await fetch(`${API_URL}/user-boards`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          board_id: props.selectedBoardId,
        }),
      });

      if (response.ok) {
        window.alert("Membro removido com sucesso!");

        // Atualiza lista de membros
        const membersRes = await fetch(
          `${API_URL}/boards/${props.selectedBoardId}/users`,
        );
        const membersData = await membersRes.json();
        setBoardMembers(membersData.rows || []);
      } else {
        window.alert("Erro ao remover membro");
      }
    } catch (error) {
      window.alert("Erro ao remover membro");
      console.error(error);
    }
  }

  // Extrair userId do token JWT
  const getUserIdFromToken = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  return (
    <div className="navbar">
      <button onClick={onHomeClick}>Home </button>
      <div className="menu-item">
        <button type="button">Quadros</button>
        <div className="tables">
          <button type="button" onClick={createNewBoard} className="addBoard">
             Adicionar Quadro 
          </button>
          <button type="button" onClick={removeBoard} className="deleteBoard">
             Apagar Quadro 
          </button>
          {window.location.pathname === "/logged" &&
            props.boardsData?.map((board) => (
              <button
                
                type="button"
                key={board.id}
                onClick={() => props.onBoardClick(board.id)}
                className="board"
                style={
                  props.selectedBoardId === board.id
                    ? { fontWeight: "bold", backgroundColor: "#e0e0e0" }
                    : {}
                }
              >
                {board.title}
              </button>
            ))}
        </div>
      </div>
      <div className="menu-item">
        <button>Membros</button>
        <div className="tables">
          <button type="button" onClick={addMemberToBoard}className="addMember">
            Adicionar membro
          </button>
          <button type="button" onClick={removeMemberFromBoard} className="deleteMember">
            Remover membro
          </button>
          {boardMembers.map((member) => (
            <button type="button" key={member.id} className="member">
              {member.username}
            </button>
          ))}
        </div>
      </div>
      <button>Configurações</button>

      <div className="loginButton">
      <h3>User ID: {getUserIdFromToken()}</h3>
      <button
        className="loginButton"
        onClick={token ? onLogoutClick : onLoginClick}
        onTouchStart={token ? onLogoutClick : onLoginClick}
      >
        {token ? "Logout" : "Login"}
      </button>
      </div>
    </div>
  );
}
export default NavBar;
