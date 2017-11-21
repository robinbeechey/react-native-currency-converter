export const CHANGE_CONNECTION_STATUS = 'CHANGE_CONNECTION_STATUS';

export const changeNetworkStatus = status => {
    return {
        type: CHANGE_CONNECTION_STATUS,
        status
    }
};