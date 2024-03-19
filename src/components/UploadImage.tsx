import { useRef, useState } from "react";

export const UploadImage = () => {
  const [legendInput, setLegendInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSend = async () => {
    console.log(fileInputRef.current?.files);

    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const fileItem = fileInputRef.current.files[0];
      const allowed = ["image/jpg", "image/jpeg", "image/png"];

      console.log(fileItem);

      if (allowed.includes(fileItem.type)) {
        const data = new FormData();
        data.append("image", fileItem);
        data.append("legend", legendInput);

        //vamos usar essa Api apenas para simular o envio pois API de imagem é cobrado por esse serviço
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: data,
        });

        const json = await resp.json();
        console.log(json);
      } else {
        alert("Arquivo incompatível!");
      }
    } else {
      alert("Selecione um arquivo");
    }
  };

  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-3xl mb-4">Upload de imagem</h1>
      <div className="max-w-md flex flex-col gap-3 border border-dotted border-gray-500 p-3 mt-4">
        <input ref={fileInputRef} type="file" />
        <input
          type="text"
          placeholder="Digite uma legenda"
          value={legendInput}
          onChange={(e) => setLegendInput(e.target.value)}
          className=" border border-gray-500 p-3 focus:border-blue-500 focus:outline-none rounded-md "
        />
        <button onClick={handleFileSend}>Enviar imagem</button>
      </div>
    </div>
  );
};
