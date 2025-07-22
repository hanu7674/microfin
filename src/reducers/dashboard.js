const initialState = {
  dashboardData: null,
  kpiData: null,
  chartsData: [],
  loading: false,
  error: null
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DASHBOARD_DATA_REQUEST':
    case 'FETCH_KPI_DATA_REQUEST':
    case 'FETCH_CHARTS_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'FETCH_DASHBOARD_DATA_SUCCESS':
      return {
        ...state,
        dashboardData: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_KPI_DATA_SUCCESS':
      return {
        ...state,
        kpiData: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_CHARTS_DATA_SUCCESS':
      return {
        ...state,
        chartsData: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_DASHBOARD_DATA_FAILURE':
    case 'FETCH_KPI_DATA_FAILURE':
    case 'FETCH_CHARTS_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default dashboardReducer; 