
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";
import Login from "./Login";
import RedefinirSenha from "./RedefinirSenha";
import App from "../App";

export default function AuthGate() {
  const [sessao, setSessao] = useState<Session | null>(null);
  const [verificando, setVerificando] = useState(true);
  const [erroSaida, setErroSaida] = useState("");

  const [recuperandoSenha, setRecuperandoSenha] = useState(
    () =>
      new URLSearchParams(window.location.search).get(
        "recuperar-senha"
      ) === "1"
  );

  
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (evento, novaSessao) => {
        if (evento === "PASSWORD_RECOVERY") {
          setRecuperandoSenha(true);
        }

        setSessao(novaSessao);
        setVerificando(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  
  async function sair() {
    setErroSaida("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setErroSaida(error.message);
    }
  }
  
  if (verificando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3fafb]">
        <p className="text-slate-600">
          Verificando sua sessão...
        </p>
      </div>
    );
  }
  
  if (recuperandoSenha) {
    if (!sessao) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f3fafb] p-5 text-center">
          <h1 className="text-xl font-semibold text-slate-800">
            Link de recuperação inválido ou expirado
          </h1>

          <p className="text-sm text-slate-600">
            Solicite um novo link na tela de login.
          </p>

          <a
            href="/"
            className="font-medium text-emerald-700 hover:underline"
          >
            Voltar ao login
          </a>
        </div>
      );
    }

    return <RedefinirSenha />;
  }

  
  if (!sessao) {
    return <Login />;
  }

  return (
    <>
      <div className="fixed right-4 top-4 z-[70] flex flex-col items-end gap-1">
        <button
          type="button"
          onClick={sair}
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-800"
        >
          Sair da conta
        </button>

        {erroSaida && (
          <p
            role="alert"
            className="rounded bg-white p-2 text-sm text-red-600"
          >
            {erroSaida}
          </p>
        )}
      </div>

      <App userId={sessao.user.id} />
    </>
  );
}
