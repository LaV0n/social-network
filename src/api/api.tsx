import axios from "axios";

const instance= axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    withCredentials:true,
    headers:{"API-KEY":'45599275-fc7c-4215-aaa5-a9a36d291e1f'}
})

export const UsersAPI = {
    GetUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    UnfollowUser(id: number) {
        return instance.delete(`follow/${id}`)
    },
    FollowUser(id: number) {
        return instance.post(`follow/${id}`)
    },
    GetProfile(userId:number) {
        return ProfileAPI.GetProfile(userId)
    }
}

export const ProfileAPI ={
    GetProfile(userId:number) {
        return instance.get(`/profile/${userId}`)
    },
    GetStatus(userId:number){
        return instance.get(`/profile/status/${userId}`)
    },
    UpdateStatus(status:string){
        return instance.put(`/profile/status/`,{status:status})
    },
    SetPhoto(file:any){
        const formData=new FormData();
        formData.append('image',file)
        return instance.put('/profile/photo',formData,{
            headers:{'Content-Type': 'multipart/form-data'}
        })
    },
    UpdateProfileData(data:any){
        return instance.put('/profile',data)
    }
}

export const AuthAPI = {
    me(){
        return instance.get(`auth/me`)
    },
    login(email:string, password:string,rememberMe:boolean,captcha:string){
        return instance.post('auth/login',{email, password,rememberMe,captcha})
    },
    logout(){
        return instance.delete('auth/login')
    }
}
export const SecurityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    }
}