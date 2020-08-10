
export default function authHeader(upload=false){
    let user = JSON.parse(localStorage.getItem('user'));

    if(user && user.token && !upload){
        return {Authorization: 'Bearer ' + user.token};
    } else if(user && user.token && upload) {
        return {
            Authorization: 'Bearer ' + user.token,
            'Content-Type': 'multipart/form-data'
        };
    } else {
        return {};
    }
}