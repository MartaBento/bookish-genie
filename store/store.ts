import { create } from "zustand";

interface WizardState {
  currentStep: number;
  favoriteGenre: string;
  selectedMood: string;
  bookLengthPreference: string;
  isLoading: boolean;
  error: string;
  recommendations: ChatChoice[];
  incrementStep: () => void;
  decrementStep: () => void;
  setFavoriteGenre: (genre: string) => void;
  setSelectedMood: (mood: string) => void;
  setBookLengthPreference: (preference: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  fetchRecommendations: () => Promise<void>;
}

const useWizardState = create<WizardState>((set, get) => ({
  currentStep: 1,
  favoriteGenre: "",
  selectedMood: "",
  bookLengthPreference: "",
  isLoading: false,
  error: "",
  recommendations: [],
  incrementStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  decrementStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setFavoriteGenre: (genre) => set({ favoriteGenre: genre }),
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  setBookLengthPreference: (preference) =>
    set({ bookLengthPreference: preference }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  // fetchRecommendations: async () => {
  //   try {
  //     set({ isLoading: true });

  //     const { favoriteGenre, selectedMood, bookLengthPreference } = get();

  //     const requestBody = {
  //       model: "gpt-3.5-turbo",
  //       messages: [
  //         { role: "system", content: "You are a book recommendation AI." },
  //         {
  //           role: "user",
  //           content: `Give me three book recommendations. My favorite genre is ${favoriteGenre}, and I'm searching for something ${selectedMood}. I prefer ${bookLengthPreference} books. Only give me the book title and the author.`,
  //         },
  //       ],
  //     };

  //     const response = await fetch(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer your_token_here",
  //         },
  //         body: JSON.stringify(requestBody),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch recommendations.");
  //     }

  //     const data = await response.json();

  //     // Update the recommendations in the state
  //     set({ isLoading: false, error: "", recommendations: data.choices });
  //   } catch (error: Error | unknown) {
  //     set({
  //       isLoading: false,
  //       error: error instanceof Error ? error.message : String(error),
  //       recommendations: [],
  //     });
  //   }
  // },
  fetchRecommendations: async () => {
    try {
      set({ isLoading: true });

      // Mocked response
      const mockedResponse = {
        id: "chatcmpl-7a6fSNPAkVWcoQVzqaesj3Q4uUu0m",
        object: "chat.completion",
        created: 1688839794,
        model: "gpt-3.5-turbo-0613",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content:
                '1. "The Alchemist" by Paulo Coelho\n2. "The Five People You Meet in Heaven" by Mitch Albom\n3. "A Man Called Ove" by Fredrik Backman',
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 55,
          completion_tokens: 42,
          total_tokens: 97,
        },
      };

      // Update the recommendations in the state with the mocked data
      set({
        isLoading: false,
        error: "",
        recommendations: mockedResponse.choices,
      });
    } catch (error: Error | unknown) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : String(error),
        recommendations: [],
      });
    }
  },
}));

export default useWizardState;
