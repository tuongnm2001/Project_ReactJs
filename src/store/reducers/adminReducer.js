import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: //FETCH_GENDER_START received from  adminActions
            let copyState = { ...state }
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }

        case actionTypes.FETCH_GENDER_SUCCESS: //FETCH_GENDER_SUCCESS received from  adminActions
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_FAILDED: //FETCH_GENDER_FAILDED received from  adminActions    


            state.genders = [];
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_SUCCESS: //FETCH_POSITION_SUCCESS received from  adminActions
            state.position = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAIDED: //FETCH_POSITION_FAIDED received from  adminActions    
            state.position = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS: //FETCH_ROLE_SUCCESS received from  adminActions
            state.roles = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAILDED: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.roles = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.users = action.users;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAILDED: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.users = [];
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.topDoctors = action.dataDoctor;
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILDED: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.topDoctors = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALl_DOCTORS_SUCCESS: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.allDoctors = action.dataDr;
            return {
                ...state
            }

        case actionTypes.FETCH_ALl_DOCTORS_FAILDED: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.allDoctors = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALlCODE_SCHEDULE_TIME_SUCCESS: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }

        case actionTypes.FETCH_ALlCODE_SCHEDULE_TIME_FAILDED: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.allDoctors = [];
            return {
                ...state
            }


        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED: //FETCH_ROLE_SUCCESS received from  adminActions    
            state.allDoctors = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer; 