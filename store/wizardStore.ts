import { create } from "zustand";

interface WizardState {
  currentStep: number;
  favoriteGenre: string;
  selectedMood: string;
  bookLengthPreference: string;
  incrementStep: () => void;
  decrementStep: () => void;
  setFavoriteGenre: (genre: string) => void;
  setSelectedMood: (mood: string) => void;
  setBookLengthPreference: (preference: string) => void;
}

const useWizardState = create<WizardState>((set) => ({
  currentStep: 1,
  favoriteGenre: "",
  selectedMood: "",
  bookLengthPreference: "",
  incrementStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  decrementStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setFavoriteGenre: (genre) => set({ favoriteGenre: genre }),
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  setBookLengthPreference: (preference) =>
    set({ bookLengthPreference: preference }),
}));

export default useWizardState;
