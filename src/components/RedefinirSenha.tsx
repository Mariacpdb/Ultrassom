
import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

export default function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const especiais = "!@#$%^&*()_+-=[]{};'\":|<>?,./`~";

  const criterios = [
    ["Pelo menos 10 caracteres", novaSenha.length >= 10],
    ["Uma letra maiúscula", /[A-Z]/.test(novaSenha)],
    ["Uma letra minúscula", /[a-z]/.test(novaSenha)],
    ["Um número", /[0-9]/.test(novaSenha)],
    [
      "Um caractere especial",
      [...novaSenha].some((caractere) =>
        especiais.includes(caractere)
      ),
    ],
  ] as const;

  const senhaValida = criterios.every(
    ([, atendido]) => atendido
  );

  const senhasIguais =
    confirmarSenha.length > 0 &&
    novaSenha === confirmarSenha;

  async function salvarSenha(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setMensagem("");

    if (!senhaValida || !senhasIguais) return;

    setSalvando(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: novaSenha,
      });

      if (error) throw error;

      const { error: erroSaida } =
        await supabase.auth.signOut();

      if (erroSaida) {
        setMensagem(
          "Senha alterada, mas não foi possível encerrar a sessão automaticamente."
        );
        return;
      }

      window.location.replace(`${window.location.origin}/`);
    } catch (error) {
      setMensagem(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a senha."
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3fafb] p-5">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-emerald-700">
          Definir nova senha
        </h1>

        <p className="mb-6 text-center text-sm text-slate-600">
          Crie uma nova senha para sua conta.
        </p>

        <form onSubmit={salvarSenha} className="space-y-5">
          <div>
            <label
              htmlFor="nova-senha"
              className="mb-2 block text-sm font-medium"
            >
              Nova senha
            </label>

            <input
              id="nova-senha"
              type={mostrarSenha ? "text" : "password"}
              value={novaSenha}
              onChange={(evento) =>
                setNovaSenha(evento.target.value)
              }
              autoComplete="new-password"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          <ul className="space-y-1">
            {criterios.map(([descricao, atendido]) => (
              <li
                key={descricao}
                className={`text-sm ${
                  atendido
                    ? "text-emerald-700"
                    : "text-slate-500"
                }`}
              >
                {atendido ? "✓" : "○"} {descricao}
              </li>
            ))}
          </ul>

          <div>
            <label
              htmlFor="confirmar-nova-senha"
              className="mb-2 block text-sm font-medium"
            >
              Confirmar nova senha
            </label>

            <input
              id="confirmar-nova-senha"
              type={mostrarSenha ? "text" : "password"}
              value={confirmarSenha}
              onChange={(evento) =>
                setConfirmarSenha(evento.target.value)
              }
              autoComplete="new-password"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />

            {confirmarSenha && (
              <p
                className={`mt-2 text-sm ${
                  senhasIguais
                    ? "text-emerald-700"
                    : "text-red-600"
                }`}
              >
                {senhasIguais
                  ? "✓ As senhas coincidem."
                  : "As senhas não coincidem."}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          </button>

          {mensagem && (
            <p role="alert" className="text-sm text-red-600">
              {mensagem}
            </p>
          )}

          <button
            type="submit"
            disabled={salvando || !senhaValida || !senhasIguais}
            className="w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50"
          >
            {salvando ? "Salvando..." : "Salvar nova senha"}
          </button>
        </form>
      </div>
    </div>
  );
}
