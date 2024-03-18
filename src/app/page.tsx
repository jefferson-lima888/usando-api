"use client";

import { User } from "@/types/User";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  //etapas realizadas para a API com uso do catch e finally
  useEffect(() => {
    console.log("Etapa 1");
    console.log("Etapa 2");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        console.log("Etapa 3");
        console.log(json);
        // setLoading(false);
        setUsers(json);
      })
      .catch(() => {
        // setLoading(false);
        console.log("Deu algum erro");
      })
      .finally(() => {
        console.log("Terminou toda a requisição");
        setLoading(false);
      });
    console.log("Etapa 4");
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl">Lista de usuários</h1>
      {loading && "Carregando..."}
      {!loading && users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email}) - {user.address.city}
            </li>
          ))}
        </ul>
      )}
      {!loading && users.length === 0 && "Não há usuários para exibir."}
    </div>
  );
}
