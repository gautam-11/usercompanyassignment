import { GET_COMPANY, COMPANY_LOADING } from "../actions/types";

const initialState = {
  company: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COMPANY:
      return {
        ...state,
        company: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
