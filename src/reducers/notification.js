import { NOTIFICATION_TYPES, NOTIFICAION_BY_ID_SUCCESS, NOTIFICAION_BY_ID_REQUEST, NOTIFICAION_BY_ID_FAILURE } from './types';

const INITIAL_STATE = {
    loading: false,
    notifications: [],
    notification: null,
    unreadCount: 0,
    error: null
};

function notificationReducer(state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case NOTIFICATION_TYPES.CREATE_NOTIFICATION_REQUEST:
        case NOTIFICATION_TYPES.FETCH_NOTIFICATIONS_REQUEST:
        case NOTIFICATION_TYPES.MARK_AS_READ_REQUEST:
        case NOTIFICAION_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case NOTIFICATION_TYPES.CREATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: [...payload, ...state.notifications],
                unreadCount: state.unreadCount + payload.length,
                error: null
            };

        case NOTIFICATION_TYPES.FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: payload.notifications,
                unreadCount: payload.unreadCount,
                error: null
            };

        case NOTIFICAION_BY_ID_SUCCESS:
            const updatedNotifications = state.notifications.map(notification =>
                notification.id === payload.id ? payload : notification
            );
            
            return {
                ...state,
                loading: false,
                notification: payload,
                notifications: updatedNotifications,
                unreadCount: state.notifications.find(n => n.id === payload.id)?.status === 'UNREAD' &&
                    (payload.status === 'OPENED' || payload.status === 'READ')
                    ? state.unreadCount - 1
                    : state.unreadCount,
                error: null
            };

        case NOTIFICATION_TYPES.MARK_AS_READ_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: state.notifications.map(notification =>
                    notification.id === payload
                        ? { ...notification, status: 'READ' }
                        : notification
                ),
                notification: state.notification?.id === payload
                    ? { ...state.notification, status: 'READ' }
                    : state.notification,
                unreadCount: state.unreadCount - 1,
                error: null
            };

        case NOTIFICATION_TYPES.UPDATE_NOTIFICATION:
            const updatedNotification = {
                ...payload,
                updatedAt: new Date()
            };
            
            return {
                ...state,
                notifications: state.notifications.map(notification =>
                    notification.id === payload.id ? updatedNotification : notification
                ),
                notification: state.notification?.id === payload.id
                    ? updatedNotification
                    : state.notification,
                unreadCount: payload.status === 'READ' && 
                    state.notifications.find(n => n.id === payload.id)?.status !== 'READ'
                    ? state.unreadCount - 1
                    : state.unreadCount
            };

        case NOTIFICATION_TYPES.DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification.id !== payload),
                notification: state.notification?.id === payload
                    ? null
                    : state.notification,
                unreadCount: state.notifications.find(n => n.id === payload)?.status === 'UNREAD'
                    ? state.unreadCount - 1
                    : state.unreadCount
            };

        case NOTIFICATION_TYPES.CLEAR_NOTIFICATIONS:
            return {
                ...state,
                notifications: [],
                notification: null,
                unreadCount: 0
            };

        case NOTIFICATION_TYPES.CREATE_NOTIFICATION_FAILURE:
        case NOTIFICATION_TYPES.FETCH_NOTIFICATIONS_FAILURE:
        case NOTIFICATION_TYPES.MARK_AS_READ_FAILURE:
        case NOTIFICAION_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };

        default:
            return state;
    }
}

export default notificationReducer;