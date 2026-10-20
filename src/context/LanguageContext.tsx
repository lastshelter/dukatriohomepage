"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "sr";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "dukatrio_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "sr") {
        setLangState(saved);
      }
    } catch {
      // Ignore storage access errors
    }

    const handleExternalLangChange = (e: Event) => {
      const detail = (e as CustomEvent<Lang>).detail;
      if (detail === "en" || detail === "sr") {
        setLangState(detail);
      }
    };
    window.addEventListener("dukatrio-lang-change", handleExternalLangChange);
    return () => window.removeEventListener("dukatrio-lang-change", handleExternalLangChange);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new CustomEvent<Lang>("dukatrio-lang-change", { detail: next }));
    } catch {
      // Ignore storage access errors
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "sr" : "en");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  const [fallbackLang, setFallbackLang] = useState<Lang>("en");

  useEffect(() => {
    if (ctx) return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "sr") {
        setFallbackLang(saved);
      }
    } catch {
      // Ignore
    }
    const onLang = (e: Event) => {
      const detail = (e as CustomEvent<Lang>).detail;
      if (detail === "en" || detail === "sr") {
        setFallbackLang(detail);
      }
    };
    window.addEventListener("dukatrio-lang-change", onLang);
    return () => window.removeEventListener("dukatrio-lang-change", onLang);
  }, [ctx]);

  if (ctx) return ctx;

  const setLang = (next: Lang) => {
    setFallbackLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      window.dispatchEvent(new CustomEvent<Lang>("dukatrio-lang-change", { detail: next }));
    } catch {
      // Ignore
    }
  };

  return {
    lang: fallbackLang,
    setLang,
    toggleLang: () => setLang(fallbackLang === "en" ? "sr" : "en"),
  };
}
