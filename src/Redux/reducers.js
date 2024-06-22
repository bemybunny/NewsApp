import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
  SET_CATEGORY,
  SET_PAGE,
} from './action'; // Ensure the correct path to the actions file

const initialState = {
  loading: false,
  articles: [],
  error: null,
  category: '',
  currentPage: 1,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload,
      };
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        currentPage: 1,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer;
