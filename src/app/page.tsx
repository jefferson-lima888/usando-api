"use client";

import { UploadImage } from "@/components/UploadImage";
import { User } from "@/types/User";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  //criando uma função para deixar a chamada da API síncrona
  const getUsers = async () => {
    setLoading(true);

    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await resp.json();
      setUsers(json);
    } catch (err) {
      console.log("Deu algum erro");
    }

    setLoading(false);
  };

  //etapas realizadas para a API com uso do catch e finally
  useEffect(() => {
    // console.log("Etapa 1");
    // console.log("Etapa 2");
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     console.log("Etapa 3");
    //     console.log(json);
    //     // setLoading(false);
    //     setUsers(json);
    //   })
    //   .catch(() => {
    //     // setLoading(false);
    //     console.log("Deu algum erro");
    //   })
    //   .finally(() => {
    //     console.log("Terminou toda a requisição");
    //     setLoading(false);
    //   });
    // console.log("Etapa 4");

    getUsers();
  }, []);

  //utilizando o método Post para adicionar um novo comentario
  const handleAddNewPost = async () => {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: "Post de teste",
        body: "Corpo de teste",
        userId: 99,
      }),
    });
    const json = await resp.json();
    console.log(json);
  };

  return (
    <div className="container mx-auto p-5">
      <button onClick={handleAddNewPost}>Adicionar novo post</button>
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
      <UploadImage />
    </div>
  );
}
