import React, { useEffect, useState } from "react";

const UseEffectLearning = () => {
  const [count, setCount] = useState(0);
  const [countB, setCountB] = useState(10);
  const [user, setUser] = useState();

  // 1 - renderiza sempre
  useEffect(() => {
    console.log("Roda a cada renderização");
  });

  //2 - array de dependências (só executa quando o estado nesse caso, count, é alterado)
  useEffect(() => {
    console.log("Só roda ao incrementar valor!");
  }, [count]);

  //3 - array de dependências vazio ( só executa quando o componente é renderizado)
  useEffect(() => {
    console.log("Só executa 1 vez");
  }, []);

  //4 - clean up function (limpar, não deixar ele ficar rodando direto para não sobrecarregar a aplicação)
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(`O incrementador foi alterado ${count} vezes.`);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  //5 - fetch em alguma api com useEffect
  useEffect(() => {
    fetch("https://api.github.com/users/fjuncal")
      .then((res) => res.json())
      .then((json) => setUser(json));
  }, []);

  return (
    <>
      <div>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          Renderizar
        </button>
        <p>{count}</p>
      </div>
      <div>
        <button onClick={() => setCountB((prevCount) => prevCount + 1)}>
          Renderizar B
        </button>
        <p>{countB}</p>
      </div>
      <div>
        <p>Dados do usuário: </p>
      </div>
    </>
  );
};

export default UseEffectLearning;
