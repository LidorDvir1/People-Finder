import { useCallback, useEffect, useReducer } from "react";
import axios from "axios";

const serverUrl = "https://randomuser.me/api/";
const serverError = "Something went wrong...";
const commonQuery = "inc=name,email,location,picture&results=25";

const USERS_REQUEST = "USERS_REQUEST";
const USERS_SUCCESS = "USERS_SUCCESS";
const USERS_FAIL = "USERS_FAIL";
const USERS_LOAD_MORE = "USERS_LOAD_MORE";

const defaultState = {
  loading: true,
  error: "",
  users: [],
  page: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case USERS_REQUEST:
      return { ...defaultState };
    case USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case USERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USERS_LOAD_MORE:
      return {
        ...state,
        page: state.page + 1,
        users: [...state.users, ...action.payload],
      };
  }
};

const getUsers = async (dispatch, query) => {
  dispatch({ type: USERS_REQUEST, payload: query });

  try {
    const res = await axios.get(`${serverUrl}?${commonQuery}&page=1&${query}`);

    if (res.status === 200) {
      dispatch({ type: USERS_SUCCESS, payload: res.data.results });
    } else {
      dispatch({ type: USERS_FAIL, payload: res.data.error });
    }
  } catch {
    dispatch({ type: USERS_FAIL, payload: serverError });
  }
};

const loadMoreUsers = async (dispatch, page, query) => {
  try {
    const res = await axios.get(`${serverUrl}?${commonQuery}&page=${page + 1}&${query}`);

    if (res.status === 200) {
      dispatch({ type: USERS_LOAD_MORE, payload: res.data.results });
    } else {
      dispatch({ type: USERS_FAIL, payload: res.data.error });
    }
  } catch {
    dispatch({ type: USERS_FAIL, payload: serverError });
  }
};

export const usePeopleFetch = (query = "") => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { loading, error, users, page } = state;

  useEffect(() => {
    getUsers(dispatch, query);
  }, [query]);

  const onLoadMoreUsers = useCallback(() => {
    loadMoreUsers(dispatch, page, query);
  }, [page, query]);

  return { loading, error, users, onLoadMoreUsers };
};
