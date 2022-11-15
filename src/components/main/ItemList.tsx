import { ItemCard } from "./ItemCard";
import {RootState} from "../../redux/store"
import {useAppSelector} from "../../redux/hook"
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { type } from "os";

type Props = {
  itemLabel: string;
};
type Welcome = {
  dates?: Dates;
  page?: number;
  results?: Result[];
  total_pages?: number;
  total_results?: number;
}
type Dates = {
  maximum?: Date;
  minimum?: Date;
}
type Result = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: OriginalLanguage;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
enum OriginalLanguage {
  De = "de",
  En = "en",
  Es = "es",
  Ja = "ja",
}
type genreType = {
  id: number;
  name: string;
};
type loadDiscoverType = {
  sortByPopulAsc: string;
  sortByPopulDes: string;
  sortByReleaAsc: string;
  sortByReleaDes: string;
  sortByRevenAsc: string;
  sortByRevenDes: string;
  genre: genreType[];
};
const loadSectionURL: string = "https://api.themoviedb.org/3/";
const ApiKey: string = "api_key=f7d6f68390c266c1854cab96343c8550";
const lang: string = "language=";
const sortBystr: string = "sort_by="
const pagestr: string = "page=";
const genresstr: string = "with_genres="
const loadDiscover: loadDiscoverType = {
  sortByPopulAsc: "popularity.asc",
  sortByPopulDes: "popularity.desc",
  sortByReleaAsc: "release_date.asc",
  sortByReleaDes: "release_date.desc",
  sortByRevenAsc: "revenue.asc",
  sortByRevenDes: "revenue.desc",
  genre: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ],
};

//   url: "https://api.themoviedb.org/3/discover/movie?api_key=f7d6f68390c266c1854cab96343c8550&language=en-US&sort_by=revenue.desc&page=1&with_genres=878",
export const ItemList: React.FC<Props> = ({ itemLabel }: Props) => {
  const appLang = useAppSelector((state: RootState) => state.lang.value)
  const [sortBy, setSortBy] = useState<string> ("popularity.asc")
  const [page, setPage] = useState<number>(1)
  const [genres, setGenres] = useState<number>(80)
  const [loading, setLoading] = useState(false);
  const [moviedata, setMoviedata] = useState<Welcome | null>(null);
  useEffect(() => {
    let request: string
    itemLabel === "discover/movie" ? request = `${loadSectionURL}${itemLabel}?${ApiKey}&${lang}${appLang}&${sortBystr}${sortBy}&${pagestr}${page}&${genresstr}${genres}`: request = `${loadSectionURL}${itemLabel}?${ApiKey}&${lang}${appLang}&${pagestr}${page}`
    setLoading(true);
    async function getUsers() {
      try {
        const { data, status } = await axios.get<Welcome>(request,{headers: {Accept: "application/json",},});
        setMoviedata(data)
        console.log(appLang)
        // console.log(JSON.stringify(data, null, 4));
        // console.log("response status is: ", status);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    }
    getUsers();
    setLoading(false);
   
  }, []);
  console.log(moviedata?.results)
  
  return <div>
    {itemLabel}
    {/* <div>{moviedata}</div> */}
    </div>;
};
