import axios from 'axios';

export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_PAGE = 'SET_PAGE';

const apiKey = 'a2479f68ac3143beafb35f7d1a816adc';

export const fetchNews = (category = '') => async (dispatch) => {
  dispatch({ type: FETCH_NEWS_REQUEST });

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const uniqueArticles = response.data.articles.filter(
      (article, index, self) =>
        index === self.findIndex((t) => t.url === article.url)
    );

    dispatch({ type: FETCH_NEWS_SUCCESS, payload: uniqueArticles });
  } catch (error) {
    dispatch({
      type: FETCH_NEWS_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});
