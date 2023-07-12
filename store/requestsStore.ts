import { parseRecommendations } from "@/utils/parseRecommendations";
import { create } from "zustand";

import { BookVolume, ISBNType } from "@/types/bookInformationResponse";

interface APIRequestsState {
  isLoading: boolean;
  recommendationsError: string;
  bookInformationError: string;
  recommendations: ChatChoice[];
  bookInformation: BookVolume[];
  setLoading: (isLoading: boolean) => void;
  setRecommendationsError: (recommendationsError: string) => void;
  setBookInformationError: (bookInformationError: string) => void;
  fetchRecommendations: (
    favoriteGenre: string,
    selectedMood: string,
    bookLengthPreference: string
  ) => Promise<void>;
  fetchBookInformation: () => Promise<void>;
}

const useAPIRequestsState = create<APIRequestsState>((set, get) => ({
  isLoading: false,
  recommendationsError: "",
  bookInformationError: "",
  recommendations: [],
  bookInformation: [],
  setLoading: (loading) => set({ isLoading: loading }),
  setRecommendationsError: (recommendationsError) =>
    set({ recommendationsError }),
  setBookInformationError: (bookInformationError) =>
    set({ bookInformationError }),
  fetchRecommendations: async (
    favoriteGenre: string,
    selectedMood: string,
    bookLengthPreference: string
  ) => {
    try {
      set({ isLoading: true });

      const requestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a book recommendation AI." },
          {
            role: "user",
            content: `Give me three book recommendations. My favorite genre is ${favoriteGenre}, and I'm searching for something ${selectedMood}. I prefer ${bookLengthPreference} books. Only give me the book title and the author.`,
          },
        ],
      };

      const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;
      const authorization = `Bearer ${apiKey}`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations.");
      }

      const data = await response.json();

      set({
        isLoading: false,
        recommendationsError: "",
        recommendations: data.choices,
      });
    } catch (error: Error | unknown) {
      set({
        isLoading: false,
        recommendationsError:
          error instanceof Error ? error.message : String(error),
        recommendations: [],
      });
    }
  },
  //   try {
  //     set({ isLoading: true });

  //     // Mocked response for book information
  //     const mockedBookInformation = [
  //       {
  //         volumeInfo: {
  //           imageLinks: {
  //             thumbnail:
  //               "http://books.google.com/books/content?id=b2CZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  //           },
  //           industryIdentifiers: [
  //             {
  //               type: ISBNType.ISBN_13,
  //               identifier: "9781668010815",
  //             },
  //             {
  //               type: ISBNType.ISBN_10,
  //               identifier: "166801081X",
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         volumeInfo: {
  //           imageLinks: {
  //             thumbnail:
  //               "http://books.google.com/books/content?id=b2CZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  //           },
  //           industryIdentifiers: [
  //             {
  //               type: ISBNType.ISBN_13,
  //               identifier: "9781668010815",
  //             },
  //             {
  //               type: ISBNType.ISBN_10,
  //               identifier: "166801081X",
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         volumeInfo: {
  //           imageLinks: {
  //             thumbnail:
  //               "http://books.google.com/books/content?id=b2CZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  //           },
  //           industryIdentifiers: [
  //             {
  //               type: ISBNType.ISBN_13,
  //               identifier: "9781668010815",
  //             },
  //             {
  //               type: ISBNType.ISBN_10,
  //               identifier: "166801081X",
  //             },
  //           ],
  //         },
  //       },
  //     ];

  //     set({
  //       isLoading: false,
  //       bookInformationError: "",
  //       bookInformation: mockedBookInformation,
  //     });
  //   } catch (error: Error | unknown) {
  //     set({
  //       isLoading: false,
  //       bookInformationError:
  //         error instanceof Error ? error.message : String(error),
  //       bookInformation: [] as BookVolume[],
  //     });
  //   }
  // },
  fetchBookInformation: async () => {
    try {
      set({ isLoading: true });

      const { recommendations } = get();
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

      const parsedRecommendations = parseRecommendations(recommendations);

      const bookPromises = parsedRecommendations.map(async (recommendation) => {
        const { book, author } = recommendation;

        const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
          book
        )}+inauthor:${encodeURIComponent(author)}&key=${apiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch book information for ${book}.`);
        }

        const data = await response.json();

        const { items } = data;

        if (!items || items.length === 0) {
          throw new Error(`No book information found for ${book}.`);
        }

        const bookInfo = items[0].volumeInfo;

        const bookVolume = {
          volumeInfo: {
            imageLinks: {
              thumbnail: bookInfo.imageLinks?.thumbnail || "",
            },
            industryIdentifiers: bookInfo.industryIdentifiers || [],
          },
        };

        return bookVolume;
      });

      const updatedBookInformation = await Promise.all(bookPromises);

      set({
        isLoading: false,
        bookInformationError: "",
        bookInformation: updatedBookInformation,
      });
    } catch (error: Error | unknown) {
      set({
        isLoading: false,
        bookInformationError:
          error instanceof Error ? error.message : String(error),
        bookInformation: [] as BookVolume[],
      });
    }
  },
}));

export default useAPIRequestsState;
