import axios from "axios";

const instance= axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    withCredentials:true,
    headers:{"API-KEY":'14be27e1-1dd0-470f-9052-c789687a0751'}
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
        console.warn("use ProfileAPI")
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
    }
}

export const AuthAPI = {
    me(){
        return instance.get(`auth/me`)
    },
}
