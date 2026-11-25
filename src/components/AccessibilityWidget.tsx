import { useEffect, useRef, useState } from "react";
import accessibilityImage from "../assets/acessibilidade.png";
import type { TextScale } from "../lib/highlights";

type Props = {
  textScale: TextScale;
  onTextScaleChange: (scale: TextScale) => void;
  highContrast: boolean;
  onHighContrastChange: () => void;
};

export default function AccessibilityWidget({
  textScale,
  onTextScaleChange,
  highContrast,
  onHighContrastChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !widgetRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function decreaseText() {
    onTextScaleChange(textScale === "larger" ? "large" : "normal");
  }

  function increaseText() {
    onTextScaleChange(textScale === "normal" ? "large" : "larger");
  }

  const scaleLabel =
    textScale === "normal"
      ? "Normal"
      : textScale === "large"
        ? "Grande"
        : "Maior";

  return (
    <div
      ref={widgetRef}
      className="fixed right-4 top-1/2 z-[70] flex -translate-y-1/2 items-center gap-3"
    >
      {open && (
        <section
          id="accessibility-options"
          aria-labelledby="accessibility-options-title"
          className="w-[min(19rem,calc(100vw-7rem))] rounded-2xl border border-slate-300 bg-white p-5 text-slate-900 shadow-xl"
        >
          <div className="mb-5">
            <h2
              id="accessibility-options-title"
              className="text-lg font-semibold text-slate-950"
            >
              Acessibilidade
            </h2>
            <p className="mt-1 text-sm leading-5 text-slate-700">
              Ajuste a leitura para ficar mais confortável.
            </p>
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-slate-900">
              Tamanho do texto
            </legend>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={decreaseText}
                disabled={textScale === "normal"}
                aria-label="Diminuir tamanho do texto"
                className="rounded-lg border border-slate-400 px-3 py-2 text-base font-semibold text-slate-950 hover:bg-slate-100 disabled:opacity-50"
              >
                A−
              </button>
              <output
                aria-live="polite"
                className="text-sm font-medium text-slate-800"
              >
                {scaleLabel}
              </output>
              <button
                type="button"
                onClick={increaseText}
                disabled={textScale === "larger"}
                aria-label="Aumentar tamanho do texto"
                className="rounded-lg border border-slate-400 px-3 py-2 text-base font-semibold text-slate-950 hover:bg-slate-100 disabled:opacity-50"
              >
                A+
              </button>
            </div>
          </fieldset>

          <button
            type="button"
            onClick={onHighContrastChange}
            aria-pressed={highContrast}
            className={`mt-4 w-full rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              highContrast
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-400 bg-white text-slate-950 hover:bg-slate-100"
            }`}
          >
            {highContrast ? "Contraste alto: ligado" : "Ativar alto contraste"}
          </button>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={
          open
            ? "Fechar opções de acessibilidade"
            : "Abrir opções de acessibilidade"
        }
        aria-expanded={open}
        aria-controls="accessibility-options"
        title="Opções de acessibilidade"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-sky-700 bg-white shadow-lg transition hover:bg-sky-50 focus-visible:outline-offset-4"
      >
        <img
          src={accessibilityImage}
          alt=""
          aria-hidden="true"
          className="h-12 w-12 object-contain"
        />
      </button>
    </div>
  );
}
