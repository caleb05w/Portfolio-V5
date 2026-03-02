import { useEffect, useReducer, useRef } from "react";

function stickerReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { stickers: action.payload, initialCount: action.payload.length };
    case "ADD":
      return { ...state, stickers: [...state.stickers, action.payload] };
    case "RESET":
      return { stickers: [], initialCount: 0 };
    default:
      return state;
  }
}

export function useStickers(currentIndex, endCardIndex) {
  const [state, dispatch] = useReducer(stickerReducer, {
    stickers: [],
    initialCount: 0,
  });
  const awardedRef = useRef(false);

  // Load from localStorage after mount (avoids SSR/hydration mismatch)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("stickers") || "[]");
      dispatch({ type: "INIT", payload: saved });
    } catch {
      // keep empty
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("stickers", JSON.stringify(state.stickers));
  }, [state.stickers]);

  // Award a sticker when user reaches the end card
  useEffect(() => {
    if (currentIndex !== endCardIndex) return;
    if (awardedRef.current || state.stickers.length >= 6) return;
    awardedRef.current = true;
    const t = setTimeout(
      () => dispatch({ type: "ADD", payload: { id: Date.now() } }),
      500,
    );
    return () => clearTimeout(t);
  }, [currentIndex, endCardIndex, state.stickers.length]);

  const resetStickers = () => {
    localStorage.removeItem("stickers");
    awardedRef.current = false;
    dispatch({ type: "RESET" });
  };

  return { stickers: state.stickers, resetStickers };
}
