import { parseRecommendations } from "@/utils/parseRecommendations";
import { create } from "zustand";

interface APIRequestsState {
  isLoading: boolean;
  error: string;
  recommendations: ChatChoice[];
  bookInformation: BookVolume[];
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  fetchRecommendations: () => Promise<void>;
  fetchBookInformation: () => Promise<void>;
}

const useAPIRequestsState = create<APIRequestsState>((set, get) => ({
  isLoading: false,
  error: "",
  recommendations: [],
  bookInformation: [],
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
  // fetchBookInformation: async () => {
  //   try {
  //     set({ isLoading: true });

  //     const { recommendations } = get();
  //     const apiKey = "yourAPIKey";

  //     const parsedRecommendations = parseRecommendations(recommendations);

  //     const bookPromises = parsedRecommendations.map(async (recommendation) => {
  //       const { book, author } = recommendation;

  //       const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
  //         book
  //       )}+inauthor:${encodeURIComponent(author)}&key=${apiKey}`;

  //       const response = await fetch(url);

  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch book information for ${book}.`);
  //       }

  //       const data = await response.json();

  //       const { items } = data;

  //       if (!items || items.length === 0) {
  //         throw new Error(`No book information found for ${book}.`);
  //       }

  //       const bookInfo = items[0].volumeInfo;

  //       const bookVolume = {
  //         volumeInfo: {
  //           imageLinks: {
  //             thumbnail: bookInfo.imageLinks?.thumbnail || "",
  //           },
  //           industryIdentifiers: bookInfo.industryIdentifiers || [],
  //         },
  //       };

  //       return bookVolume;
  //     });

  //     const updatedBookInformation = await Promise.all(bookPromises);

  //     set({
  //       isLoading: false,
  //       error: "",
  //       bookInformation: updatedBookInformation,
  //     });
  //   } catch (error: Error | unknown) {
  //     set({
  //       isLoading: false,
  //       error: error instanceof Error ? error.message : String(error),
  //       bookInformation: [] as BookVolume[],
  //     });
  //   }
  // },
  fetchBookInformation: async () => {
    try {
      set({ isLoading: true });

      // Mocked response for book information
      const mockedBookInformation = [
        {
          volumeInfo: {
            imageLinks: {
              thumbnail:
                "http://books.google.com/books/content?id=b2CZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            },
            industryIdentifiers: [
              {
                type: ISBNType.ISBN_13,
                identifier: "9781668010815",
              },
              {
                type: ISBNType.ISBN_10,
                identifier: "166801081X",
              },
            ],
          },
        },
      ];

      // Update the book information in the state with the mocked data
      set({
        isLoading: false,
        error: "",
        bookInformation: mockedBookInformation,
      });
    } catch (error: Error | unknown) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : String(error),
        bookInformation: [] as BookVolume[],
      });
    }
  },
}));

export default useAPIRequestsState;
