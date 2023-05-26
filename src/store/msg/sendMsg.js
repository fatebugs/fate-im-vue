//求和相关的配置
export default {
    namespaced:true,
    state:{
        formVisible:false,
        videoVisible:false,
        fileVisible:false,
        userFriendVisible:false,
        userApplyVisible:false,
        createGroupVisible:false,
        createChannelVisible:false,
    },
    actions:{

    },
    mutations:{
        setFormVisible(state,formVisible){
            state.formVisible = formVisible;
        },
        setVideoVisible(state,videoVisible){
            state.videoVisible = videoVisible;
        },
        setFileVisible(state,fileVisible){
            state.fileVisible = fileVisible;
        },
        setUserFriendVisible(state,userFriendVisible){
            state.userFriendVisible = userFriendVisible;
        },
        setUserApplyVisible(state,userApplyVisible){
            state.userApplyVisible = userApplyVisible;
        },
        setCreateGroupVisible(state,createGroupVisible){
            state.createGroupVisible = createGroupVisible;
        },
        setCreateChannelVisible(state,createChannelVisible){
            state.createChannelVisible = createChannelVisible;
        },

    },
    getters:{

    },
}
