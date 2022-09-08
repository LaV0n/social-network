import  {ProfileReducer,addPostActionCreate, deletePostAC} from "./ProfileReducer";


let state = {
    postsData: [
        {id: 1, message: 'Hi', likeCount: 5},
        {id: 2, message: 'I am alive', likeCount: 5},
        {id: 3, message: 'Who is here?', likeCount: 5}
    ],
    profile: null,
    status: ""
}

test('add post test ->length expect 4',()=>{

    let action = addPostActionCreate('test-value')

    let newState=ProfileReducer(state,action)

    expect(newState.postsData.length).toBe(4)
})

test('delete post test -> length expect 2',()=>{

    let action = deletePostAC(3)

    let newState=ProfileReducer(state,action)

    expect(newState.postsData.length).toBe(2)
})