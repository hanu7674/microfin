import { 
  getDocs, 
  getDoc, 
  updateDoc, 
  query, 
  orderBy, 
  limit,
  serverTimestamp, 
  setDoc
} from 'firebase/firestore';
import { 
  userDashboardDataRef,
  userKpiDataRef,
  userChartsDataRef
} from '../Firebase/firebase';
import { notify } from 'reapop';

// Dashboard Data Actions
export const fetchDashboardDataRequest = () => ({
  type: 'FETCH_DASHBOARD_DATA_REQUEST'
});

export const fetchDashboardDataSuccess = (data) => ({
  type: 'FETCH_DASHBOARD_DATA_SUCCESS',
  payload: data
});

export const fetchDashboardDataFailure = (error) => ({
  type: 'FETCH_DASHBOARD_DATA_FAILURE',
  payload: error
});

export const fetchDashboardData = (userId) => async (dispatch) => {
  try {
    dispatch(fetchDashboardDataRequest());
    
    const dashboardRef = userDashboardDataRef(userId);
    const dashboardDoc = await getDoc(dashboardRef);
    
    if (dashboardDoc.exists()) {
      dispatch(fetchDashboardDataSuccess(dashboardDoc.data()));
    } else {
      // Create default dashboard data if it doesn't exist
      const defaultData = {
        totalRevenue: 0,
        totalExpenses: 0,
        netProfit: 0,
        activeLoans: 0,
        totalClients: 0,
        pendingInvoices: 0,
        overduePayments: 0,
        monthlyGrowth: 0,
        lastUpdated: serverTimestamp()
      };
      
      await updateDoc(dashboardRef, defaultData);
      dispatch(fetchDashboardDataSuccess(defaultData));
    }
  } catch (error) {
    dispatch(fetchDashboardDataFailure(error.message));
    dispatch(notify({ message: error.message, status: 'error' }));
  }
};

// KPI Data Actions
export const fetchKpiDataRequest = () => ({
  type: 'FETCH_KPI_DATA_REQUEST'
});

export const fetchKpiDataSuccess = (data) => ({
  type: 'FETCH_KPI_DATA_SUCCESS',
  payload: data
});

export const fetchKpiDataFailure = (error) => ({
  type: 'FETCH_KPI_DATA_FAILURE',
  payload: error
});

export const fetchKpiData = (userId) => async (dispatch) => {
  try {
    dispatch(fetchKpiDataRequest());
    
    const kpiRef = userKpiDataRef(userId);
    const kpiDoc = await getDoc(kpiRef);
    
    if (kpiDoc.exists()) {
      dispatch(fetchKpiDataSuccess(kpiDoc.data()));
    } else {
      // Create default KPI data
      const defaultKpiData = {
        totalRevenue: { value: 0, change: 0, trend: 'positive' },
        activeCustomers: { value: 0, change: 0, trend: 'positive' },
        avgTransaction: { value: 0, change: 0, trend: 'positive' },
        growthRate: { value: 0, change: 0, trend: 'positive' },
        lastUpdated: serverTimestamp()
      };
      
      await setDoc(kpiRef, defaultKpiData);
      dispatch(fetchKpiDataSuccess(defaultKpiData));
    }
  } catch (error) {
    dispatch(fetchKpiDataFailure(error.message));
    dispatch(notify({ message: error.message, status: 'error' }));
  }
};

// Charts Data Actions
export const fetchChartsDataRequest = () => ({
  type: 'FETCH_CHARTS_DATA_REQUEST'
});

export const fetchChartsDataSuccess = (data) => ({
  type: 'FETCH_CHARTS_DATA_SUCCESS',
  payload: data
});

export const fetchChartsDataFailure = (error) => ({
  type: 'FETCH_CHARTS_DATA_FAILURE',
  payload: error
});

export const fetchChartsData = (userId) => async (dispatch) => {
  try {
    dispatch(fetchChartsDataRequest());
    
    const chartsQuery = query(
      userChartsDataRef(userId),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const chartsSnapshot = await getDocs(chartsQuery);
    const chartsData = chartsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    dispatch(fetchChartsDataSuccess(chartsData));
  } catch (error) {
    dispatch(fetchChartsDataFailure(error.message));
    dispatch(notify({ message: error.message, status: 'error' }));
  }
};

// Update Dashboard Data
export const updateDashboardData = (userId, data) => async (dispatch) => {
  try {
    const dashboardRef = userDashboardDataRef(userId);
    await updateDoc(dashboardRef, {
      ...data,
      lastUpdated: serverTimestamp()
    });
    
    dispatch(fetchDashboardData(userId));
    dispatch(notify({ message: 'Dashboard data updated successfully', status: 'success' }));
  } catch (error) {
    dispatch(notify({ message: error.message, status: 'error' }));
  }
}; 