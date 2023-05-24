//求和相关的配置
export default {
    namespaced:true,
    state:{
        formVisible:false,
        videoVisible:false,
        fileVisible:false,
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
    },
    getters:{

    },
}
