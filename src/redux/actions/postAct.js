// import Axios from "axios"
// import { API_URL } from "../../constants/API"

// export const getPostData = (userId) => {
//     return (dispatch) => {
//         Axios.get(`${API_URL}/post` , {
//             params : {
//                 userId
//             }
//         })
//         .then((result) => {
//             dispatch({
//                 type : "GET_POST",
//                 payload : result.data
//             })
//         })
//         .catch((err) => {
//             alert(err)
//         })
//     }
// }