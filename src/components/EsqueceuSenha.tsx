
import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  onVoltar: () => void;
};

export default function EsqueceuSenha({ onVoltar }: Props) {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  async function enviarEmail(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo:
            `${window.location.origin}/?recuperar-senha=1`,
        }
      );

      if (error) throw error;

      setEnviado(true);
   
    } catch (error) {
      const mensagemOriginal =
        error instanceof Error ? error.message : "";

      if (mensagemOriginal.toLowerCase().includes("rate limit")) {
        setErro(
          "Limite de envio de e-mails atingido. Aguarde um pouco antes de solicitar outro link de recuperação."
        );
      } else {
        setErro(
          "Não foi possível enviar o link de recuperação. Tente novamente mais tarde."
        );
      }
    } finally {
      setEnviando(false);
      }
   }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3fafb] p-5">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-emerald-700">
          Recuperar senha
        </h1>

        <p className="mb-6 text-center text-sm text-slate-600">
          Informe seu e-mail para receber um link de recuperação.
        </p>

        {enviado ? (
          <p role="status" className="mb-5 text-sm text-emerald-700">
            Se este e-mail estiver cadastrado, você receberá
            instruções para redefinir sua senha.
          </p>
        ) : (
          <form onSubmit={enviarEmail} className="space-y-5">
            <div>
              <label
                htmlFor="email-recuperacao"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                E-mail
              </label>

              <input
                id="email-recuperacao"
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="seuemail@exemplo.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
              />
            </div>

            {erro && (
              <p role="alert" className="text-sm text-red-600">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
            >
              {enviando ? "Enviando..." : "Enviar link"}
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={onVoltar}
          className="mt-6 w-full text-center text-sm font-medium text-emerald-700 hover:underline"
        >
          Voltar para o login
        </button>
      </div>
    </div>
  );
}
