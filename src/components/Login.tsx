
import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";
import EsqueceuSenha from "./EsqueceuSenha";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cadastro, setCadastro] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [esqueceuSenha, setEsqueceuSenha] = useState(false);

  const caracteresEspeciais = "!@#$%^&*()_+-=[]{};'\":|<>?,./`~";

  const criteriosSenha = [
    {
      descricao: "Pelo menos 10 caracteres",
      atendido: senha.length >= 10,
    },
    {
      descricao: "Uma letra maiúscula",
      atendido: /[A-Z]/.test(senha),
    },
    {
      descricao: "Uma letra minúscula",
      atendido: /[a-z]/.test(senha),
    },
    {
      descricao: "Um número",
      atendido: /[0-9]/.test(senha),
    },
    {
      descricao: "Um caractere especial",
      atendido: [...senha].some((caractere) =>
        caracteresEspeciais.includes(caractere)
      ),
    },
  ];

  const senhaForte = criteriosSenha.every(
    (criterio) => criterio.atendido
  );

  const senhasIguais =
    confirmarSenha.length > 0 && senha === confirmarSenha;

  async function autenticar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    setMensagem("");
    setErro(false);

    if (cadastro && (!senhaForte || !senhasIguais)) {
      setErro(true);
      setMensagem(
        "Verifique os requisitos e a confirmação da senha."
      );
      return;
    }

    
    setCarregando(true);

    try {
      if (cadastro) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: senha,
        });

        if (error) throw error;

        if (!data.session) {
          setMensagem(
            "Cadastro solicitado! Verifique seu e-mail para confirmar a conta."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: senha,
        });

        if (error) throw error;
      }
    } catch (error) {
      setErro(true);

      const mensagemOriginal =
        error instanceof Error ? error.message : "";

      if (mensagemOriginal.toLowerCase().includes("rate limit")) {
        setMensagem(
          "Muitas solicitações foram realizadas. Aguarde um pouco antes de tentar novamente."
        );
      } else {
        setMensagem(
          mensagemOriginal ||
            "Ocorreu um erro inesperado. Tente novamente."
        );
      }
    } finally {
      setCarregando(false);
    }
  }



  function alternarModo() {
    setCadastro(!cadastro);
    setSenha("");
    setConfirmarSenha("");
    setMostrarSenha(false);
    setMensagem("");
    setErro(false);
  }

  if (esqueceuSenha) {
    return (
      <EsqueceuSenha
        onVoltar={() => setEsqueceuSenha(false)}
      />
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3fafb] p-5">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-emerald-700">
            Ultrassom Terapêutico
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Plataforma de conteúdo educacional
          </p>
        </div>

        <h2 className="mb-2 text-2xl font-semibold text-slate-800">
          {cadastro ? "Criar conta" : "Bem-vindo!"}
        </h2>

        <p className="mb-6 text-sm text-slate-500">
          {cadastro
            ? "Cadastre-se para acessar a plataforma."
            : "Entre com seu e-mail e senha."}
        </p>

        <form onSubmit={autenticar} className="space-y-5">

          
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              placeholder="seuemail@exemplo.com"
              autoComplete="email"
              autoCapitalize="none"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          
          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Senha
            </label>

            <input
              id="senha"
              type={mostrarSenha ? "text" : "password"}
              value={senha}
              onChange={(evento) => setSenha(evento.target.value)}
              placeholder="Digite sua senha"
              autoComplete={
                cadastro ? "new-password" : "current-password"
              }
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
            />
          </div>

          {cadastro && (
            <>
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Sua senha precisa ter:
                </p>

                <ul className="space-y-1" aria-live="polite">
                  {criteriosSenha.map((criterio) => (
                    <li
                      key={criterio.descricao}
                      className={`text-sm ${
                        criterio.atendido
                          ? "text-emerald-700"
                          : "text-slate-500"
                      }`}
                    >
                      {criterio.atendido ? "✓" : "○"}{" "}
                      {criterio.descricao}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label
                  htmlFor="confirmar-senha"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirmar senha
                </label>

                <input
                  id="confirmar-senha"
                  type={mostrarSenha ? "text" : "password"}
                  value={confirmarSenha}
                  onChange={(evento) =>
                    setConfirmarSenha(evento.target.value)
                  }
                  placeholder="Digite sua senha novamente"
                  autoComplete="new-password"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500"
                />

                {confirmarSenha.length > 0 && (
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
            </>
          )}

          
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
          </button>

          
          {mensagem && (
            <p
              role="status"
              className={`text-sm ${
                erro ? "text-red-600" : "text-emerald-700"
              }`}
            >
              {mensagem}
            </p>
          )}

          <button
            type="submit"
            disabled={
              carregando ||
              (cadastro && (!senhaForte || !senhasIguais))
            }
            className="w-full rounded-lg bg-emerald-700 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {carregando
              ? "Aguarde..."
              : cadastro
                ? "Cadastrar"
                : "Entrar"}
          </button>

        </form>

        
        {!cadastro && (
          <div className="mt-4 text-right">
            <button
              type="button"
              onClick={() => {
                setMensagem("");
                setEsqueceuSenha(true);
              }}
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              Esqueceu sua senha?
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-sm font-medium text-emerald-700 hover:underline"
            onClick={alternarModo}
          >
            {cadastro
              ? "Já tem uma conta? Entrar"
              : "Não tem uma conta? Cadastre-se"}
          </button>
        </div>

      </div>
    </div>
  );
}
