import { parseRecommendations } from "@/utils/parseRecommendations";
import { create } from "zustand";

import { BookVolume, ISBNType } from "@/types/bookInformationResponse";

interface APIRequestsState {
  isLoading: boolean;
  recommendationsError: string;
  bookInformationError: string;
  recommendations: { book: string; author: string }[];
  bookInformation: BookVolume[];
  setLoading: (isLoading: boolean) => void;
  setRecommendationsError: (recommendationsError: string) => void;
  setBookInformationError: (bookInformationError: string) => void;
  fetchRecommendations: () => Promise<void>;
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

      const recommendations = parseRecommendations(mockedResponse.choices);

      set({
        isLoading: false,
        recommendationsError: "",
        recommendations: recommendations,
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

      set({
        isLoading: false,
        bookInformationError: "",
        bookInformation: mockedBookInformation,
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
