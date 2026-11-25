import { useState, type FormEvent } from "react";
import ultrassomImage from "../assets/Ultrassom2.jpg";
import { supabase } from "../lib/supabase";
import EsqueceuSenha from "./EsqueceuSenha";

type LoginProps = {
  onEntrarSemConta: () => void;
};

export default function Login({ onEntrarSemConta }: LoginProps) {
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
    <main className="flex min-h-screen flex-col bg-white lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(25rem,0.85fr)]">
      <section className="order-2 relative overflow-hidden bg-gradient-to-br from-[#eef8f7] via-[#f7fbfa] to-[#e6f2f1] px-6 py-8 sm:px-10 sm:py-10 lg:order-1 lg:flex lg:min-h-screen lg:items-center lg:px-12 lg:py-12 xl:px-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="mt-2 sm:mt-4 lg:mt-0">
            <p className="mb-3 text-base font-semibold uppercase tracking-[0.16em] text-emerald-900">
              Conteúdo para aprender no seu ritmo
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl xl:text-6xl">
              Entenda o ultrassom terapêutico com clareza.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-800 sm:text-xl">
              Estude a física das ondas, os parâmetros de aplicação, os efeitos
              nos tecidos, a segurança e o que as pesquisas mostram.
            </p>
          </div>

          <figure className="mt-6 overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-emerald-950/10 sm:mt-8 sm:rounded-3xl">
            <div className="relative aspect-[2/1]">
              <img
                src={ultrassomImage}
                alt="Fisioterapeuta aplicando ultrassom terapêutico em um paciente"
                className="h-full w-full object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent"
              />
              <figcaption className="absolute bottom-4 left-4 right-4 text-base font-semibold text-white drop-shadow sm:bottom-5 sm:left-6">
                Conceitos claros para apoiar seus estudos.
              </figcaption>
            </div>
          </figure>

          <div className="mt-7 hidden grid-cols-3 gap-3 lg:grid">
            <div className="rounded-2xl border border-slate-300 bg-white/85 p-4">
              <p className="text-lg font-semibold text-slate-950">Por temas</p>
              <p className="mt-1 text-base leading-6 text-slate-800">
                Conteúdo organizado para explorar.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-white/85 p-4">
              <p className="text-lg font-semibold text-slate-950">No seu ritmo</p>
              <p className="mt-1 text-base leading-6 text-slate-800">
                Consulte os tópicos quando quiser.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-white/85 p-4">
              <p className="text-lg font-semibold text-slate-950">Acesso livre</p>
              <p className="mt-1 text-base leading-6 text-slate-800">
                Conheça o conteúdo sem criar conta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="order-1 flex flex-col px-6 py-8 sm:px-10 sm:py-12 lg:order-2 lg:min-h-screen lg:justify-center lg:border-l lg:border-slate-100 lg:px-12 xl:px-16">
        <div className="my-auto w-full max-w-md lg:mx-auto">
          <div className="mb-8">
            <p className="mb-3 text-base font-semibold uppercase tracking-[0.14em] text-emerald-900">
              {cadastro ? "Novo por aqui?" : "Acesse sua conta"}
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-slate-950">
              {cadastro ? "Criar conta" : "Bem-vindo de volta"}
            </h2>
            <p className="mt-2 text-base leading-7 text-slate-700">
              {cadastro
                ? "Cadastre-se para salvar seus tópicos favoritos."
                : "Entre para continuar seus estudos e acessar seus favoritos."}
            </p>
          </div>

          <form onSubmit={autenticar} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-base font-semibold text-slate-900"
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
                className="w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-600 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/15"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="mb-2 block text-base font-semibold text-slate-900"
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
                className="w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-600 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/15"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="mt-2 text-base font-semibold text-emerald-900 hover:underline"
              >
                {mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              </button>
            </div>

            {cadastro && (
              <>
                <div className="rounded-xl bg-[#f3faf7] p-4">
                  <p className="mb-2 text-base font-semibold text-slate-900">
                    Sua senha precisa ter:
                  </p>
                  <ul className="space-y-1" aria-live="polite">
                    {criteriosSenha.map((criterio) => (
                      <li
                        key={criterio.descricao}
                        className={`text-base ${
                          criterio.atendido
                            ? "text-emerald-800"
                            : "text-slate-700"
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
                    className="mb-2 block text-base font-semibold text-slate-900"
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
                    className="w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-600 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/15"
                  />
                  {confirmarSenha.length > 0 && (
                    <p
                      className={`mt-2 text-base ${
                        senhasIguais ? "text-emerald-700" : "text-red-600"
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

            {mensagem && (
              <p
                role="status"
                className={`text-base ${
                  erro ? "text-red-700" : "text-emerald-800"
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
              className="w-full rounded-xl bg-emerald-900 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-emerald-700/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {carregando
                ? "Aguarde..."
                : cadastro
                  ? "Criar minha conta"
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
                className="text-base font-semibold text-emerald-900 hover:underline"
              >
                Esqueceu sua senha?
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-base font-semibold text-emerald-900 hover:underline"
              onClick={alternarModo}
            >
              {cadastro
                ? "Já tem uma conta? Entrar"
                : "Ainda não tem conta? Cadastre-se"}
            </button>
          </div>

          <div className="mt-7 border-t border-slate-200 pt-6 text-center">
            <p className="mb-3 text-base text-slate-700">
              Quer conhecer o conteúdo primeiro?
            </p>
            <button
              type="button"
              onClick={onEntrarSemConta}
              className="w-full rounded-xl border border-emerald-800 px-4 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-700/10"
            >
              Continuar sem conta
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
