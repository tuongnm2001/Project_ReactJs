import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHome, getAllDoctors,
    saveDetailDoctorService, getAllSpecialty, getAllClinic
} from '../../services/userService'
import { toast } from 'react-toastify'
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            // call API
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                console.log('check get state : ', getState)
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFaided());
            }
        } catch (e) {
            dispatch(fetchGenderFaided());
            console.log('fetchGenderStart error : ', e)
        }
    }

}


// Gender
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED
})

// Position
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})

// Role
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

//Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            // call API
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                console.log('check get state : ', getState)
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFaided());
            }
        } catch (e) {
            dispatch(fetchPositionFaided());
            console.log('fetchGenderStart error : ', e)
        }
    }

}

//Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            // call API
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFaided());
            }
        } catch (e) {
            dispatch(fetchRoleFaided());
            console.log('fetchGenderStart error : ', e)
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            // call API
            let res = await createNewUserService(data);
            console.log('check create user redux : ', res)
            if (res && res.errCode === 0) {
                toast.success('Create a new user succeed')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('fetchGenderStart error : ', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})


//get all users 
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            // call API
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUserFaided());
            }
        } catch (e) {
            dispatch(fetchAllUserFaided());
            console.log('fetchAllUserFaided error : ', e)
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFaided = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED,

})

//delete
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            // call API
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.error('Detele the user succeed !')
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Fetch all user error !')
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error('Fetch all user error !')
            dispatch(deleteUserFailed());
            console.log('fetchGenderStart error : ', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED,

})

//edit
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            // call API
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Update the user succeed !')
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error('Fetch all user error !')
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error('Fetch all user error !')
            dispatch(editUserFailed());
            console.log('fetchGenderStart error : ', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED,

})

//top doctors
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHome('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
                })
            }
            console.log('check Stevie T : ', res)
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
            })
        }
    }
}

//get all doctor
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALl_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALl_DOCTORS_FAILDED,
                })
            }
            console.log('check Stevie T : ', res)
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_ALl_DOCTORS_FAILDED,
            })
        }
    }
}

//save detail doctor
export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save infor detail Doctor succeed !')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                console.log('check error : ', res)
                toast.error('Save infor detail Doctor failed !')
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
                })
            }
            console.log('check Stevie T : ', res)
        } catch (e) {
            toast.error('Save infor detail Doctor failed !')
            console.log('FETCH_TOP_DOCTORS_FAILDED', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
            })
        }
    }
}

//allcode 
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALlCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALlCODE_SCHEDULE_TIME_FAILDED,
                })
            }
            console.log('check Stevie T : ', res)
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILDED', e)
            dispatch({
                type: actionTypes.FETCH_ALlCODE_SCHEDULE_TIME_FAILDED,
            })
        }
    }
}

//Required Doctor Infor
export const getRiquiredDoctorInfo = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            // call API
            let resPrice = await getAllCodeService('PRICE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resProvince = await getAllCodeService('PROVINCE');
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforFailed(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFaided());
            console.log('fetchGenderStart error : ', e)
        }
    }

}

export const fetchRequiredDoctorInforFailed = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFaided = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED
})

