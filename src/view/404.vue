<template>
    <div class="error-404">
        <div id="doc_main">
            <section class="bd clearfix">
                <div class="module-error">
                    <div class="error-main clearfix">
                        <div class="label"></div>
                        <div class="info">
                            <h3 class="title">啊哦，你所访问的页面不存在了。</h3>
                            <div class="reason">
                                <p>可能的原因：</p>
                                <p>1.在地址栏中输入了错误的地址。</p>
                                <p>2.你点击的某个链接已过期。</p>
                            </div>
                            <div class="oper">
                                <p><a href="javascript:history.go(-1);">返回上一级页面&gt;</a></p>
                                <p><router-link to="/">回到网站首页&gt;</router-link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>


<script>
    export default {
        name: ""
    }
</script>

<style scoped>
    body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, textarea, select, optgroup, option, fieldset, legend, p, blockquote, th, td {
        margin:0;
        padding:0
    }
    fieldset, img {
        border:0
    }
    ul, li, ol {
        list-style:none
    }
    h1, h2, h3, h4, h5, h6 {
        font-size:100%
    }
    legend {
        color:#000
    }
    input, button, textarea, select, optgroup, option {
        font-family:inherit;
        font-size:inherit;
        font-style:inherit;
        font-weight:inherit
    }
    input, button, select {
        margin:0;
        *font-size:100%;
        line-height:1.2
    }
    a img, img {
        -ms-interpolation-mode:bicubic
    }
    body {
        background:#FFF
    }
    a {
        color:#06c;
        text-decoration:none
    }
    a:hover, a:active, a:focus {
        color:#06c;
        text-decoration:underline
    }
    table {
        border-collapse:collapse;
        border-spacing:0
    }
    header, aside, section {
        display:block
    }
    body, button, input, select, textarea {
        font:12px/1.5 tahoma, arial, "宋体";
        color:#666
    }
    ::-webkit-scrollbar-track-piece {
        background-color:#fff;
        -webkit-border-radius:3px
    }
    ::-webkit-scrollbar {
        width:12px;
        height:10px
    }
    ::-webkit-scrollbar-thumb {
        height:30px;
        background-color:#999;
        -webkit-border-radius:7px;
        outline:2px solid #fff;
        outline-offset:-2px;
        border:2px solid #fff
    }
    ::-webkit-scrollbar-thumb:hover {
        height:30px;
        background-color:#9f9f9f;
        -webkit-border-radius:8px
    }

    .doc-triple .hd-main, #doc_main .hd-main, #doc_album .hd-main {
        padding:0 5px;
        height:49px;
        background:#252525;
        border-bottom:0;
        position:relative;
        z-index:15;
        min-width:1000px
    }
    .hd-main .has-pulldown {
        cursor:pointer;
        position:relative;
        *z-index:10000
    }
    .hd-main .pulldown {
        position:absolute;
        cursor:default;
        display:none;
        top:30px;
        left:0
    }
    .hd-main .pulldown .arrow {
        *margin-bottom:-1px;
        _margin-bottom:0;
        height:0;
        width:0;
        font-size:0;
        line-height:0;
        border-width:7px;
        border-style:solid;
        border-color:transparent transparent #F6F6F9 transparent;
        _filter:chroma(color=tomato);
        _border-color:tomato tomato #F6F6F9 tomato;
        position:relative;
        display:block;
        left:20px;
        z-index:2
    }
    .hd-main .pulldown .content {
        background:#F6F6F9;
        color:#333;
        text-align:left;
        border-radius:3px;
        border:rgb(175,175,175) 1px solid;
        border-width:0 1px 1px 1px;
        box-shadow:0 2px 4px rgba(0, 0, 0, .2);
        position:relative;
        z-index:1
    }
    .hd-main .pulldown-canvas {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        opacity:0;
        filter:alpha(opacity=0)
    }
    .hd-main .logo {
        display:block;
        height:36px;
        width:113px;
        float:left;
        background-position:0 0;
        margin-top:5px;
        display:inline
    }
    .hd-main .navs-title {
        font:18px/30px "Microsoft YaHei", "Microsoft JhengHei", "黑体";
        color:#d8d8d8;
        display:block;
        float:left;
        height:30px
    }
    .hd-main .navs {
        padding:0 0 3px 25px;
        height:45px;
        float:left
    }
    .hd-main .navs a, .hd-main .info a, .hd-main .navs a:visited, .hd-main .info a:visited, .hd-main .navs a:active, .hd-main .info a:active {
        color:#d8d8d8
    }
    .hd-main .navs a:hover, .hd-main .navs a:active {
        text-decoration:none;
        background-color:#0f0f0f
    }
    .hd-main .navs .def-nav, .hd-main .navs .pulldown-nav, .hd-main .navs .separate {
        display:block;
        float:left;
        height:48px;
        font:18px/30px "Microsoft YaHei", "Microsoft JhengHei", "黑体";
        color:#d8d8d8;
        text-align:center;
        width:90px;
        line-height:48px
    }
    .hd-main .navs a:hover, .hd-main .navs a:active {
        text-decoration:none;
        background-color:#0f0f0f
    }
    .hd-main .navs .def-nav .app-url {
        left:150px;
        width:644px;
        top:48px
    }
    .hd-main .navs .def-nav .pulldown-canvas-url {
        width:575px;
        height:109px
    }
    .hd-main .navs .def-nav .app-url .arrow {
        left:140px
    }
    .hd-main .navs .app-url .content {
        padding:17px 0 0 22px;
        height:91px
    }
    .hd-main .navs .app-url .content a, .hd-main .navs .app-url .content a:hover {
        color:#333
    }
    .hd-main .navs .app-url .li {
        cursor:pointer;
        padding-top:8px;
        width:66px;
        height:66px;
        border-radius:3px;
        display:block;
        float:left;
        text-align:center
    }
    .hd-main .navs .app-url .li:hover {
        background-color:#e0e1e5
    }
    .hd-main .navs .app-url .li .icon {
        margin:0 auto;
        width:35px;
        height:38px;
        display:block;
    }
    .hd-main .navs .app-url .li:hover .icon {
    }
    .hd-main .navs .app-url .tongxunlu .icon {
        background-position:-35px 0
    }
    .hd-main .navs .app-url .xiangce .icon {
        background-position:-70px 0
    }
    .hd-main .navs .app-url .shoucang .icon {
        background-position:-105px 0
    }
    .hd-main .navs .app-url .note .icon {
        background-position:-140px 0
    }
    .hd-main .navs .app-url .duanxin .icon {
        background-position:-175px 0
    }
    .hd-main .navs .app-url .zhaohui .icon {
        background-position:-210px 0
    }
    .hd-main .navs .app-url .xiaodu .icon {
        background-position:-245px 0
    }
    .hd-main .navs .app-url .jiankang .icon {
        background-position:-280px 0
    }
    .hd-main .navs .app-url .wenzhang .icon {
        background-position:-315px 0
    }
    .hd-main .navs .app-url .tonghuajilu .icon {
        background-position:-350px 0
    }
    .hd-main .navs .app-url .li .text {
        height:30px;
        display:block;
        font:14px/30px "Microsoft YaHei", "Microsoft JhengHei", "黑体"
    }
    .hd-main .navs .separate {
        margin:0;
        height:48px;
        width:2px;
        background:#2A2B2D
    }
    .hd-main .navs .pulldown-nav {
        position:relative
    }
    .hd-main .navs .pulldown-nav em {
        position:absolute;
        display:block;
        right:11px;
        top:18px;
        height:12px;
        width:12px;
        font-size:0;
        background-position:-89px -45px
    }
    .hd-main .navs .pulldown-nav:hover .f-icon, .hd-main .navs .pulldown-nav:active .f-icon {
        position:absolute;
        display:block;
        right:11px;
        top:18px;
        height:12px;
        width:12px;
        font-size:0;
        background-position:-89px -55px
    }
    .hd-main .navs .current, .hd-main .navs .current .pulldown-nav {
        font-weight:bold;
        color:#FFF!important;
        display:inline-block;
        width:90px;
        height:49px;
        background-color:#0f0f0f;
        text-align:center;
        line-height:48px
    }
    .hd-main .navs .current:hover {
        color:#ECECEC
    }
    .hd-main .info, .hd-main .info ul {
        height:36px;
        float:right;
        text-align:right;
        margin-top:3px;
        *margin-left:-50px
    }
    .hd-main .info a:hover, .aside a:hover, .aside a:active {
        color:#d8d8d8;
        text-decoration:underline
    }
    .hd-main .info a:hover {
        color:#FFF
    }
    .hd-main .info .info-i {
        padding:0 10px;
        margin:10px 0;
        display:inline-block;
        *display:inline;
        *zoom:1;
        height:16px;
        border-right:#393939 1px solid;
        color:#d8d8d8;
        font:12px/16px "SimSun";
        vertical-align:middle
    }
    .hd-main .info .has-pulldown {
        padding-right:28px
    }
    .hd-main .info .has-pulldown .pull-arrow {
        position:absolute;
        display:block;
        right:10px;
        top:1px;
        height:12px;
        width:12px;
        font-size:0;
        background-position:-89px -45px
    }
    .hd-main .info .no-separate {
        border:none
    }
    .hd-main .gg-content, .hd-main .gg-content a, .hd-main .gg-content a:hover {
        color:#E15F00!important
    }
    .hd-main .search-box {
        width:180px;
        position:relative
    }
    .hd-main .search-box .robin-b-input {
        position:absolute;
        left:3px;
        top:-3px;
        display:inline-block;
        *display:inline;
        *zoom:1;
        width:180px;
        height:24px
    }
    .robin-search-form {
        overflow:hidden;
        height:22px;
        width:177px;
        border:#1a1a1a 1px solid;
        position:relative;
        background-color:#7f7f7f
    }
    .robin-search-form .robin-q {
        width:109px;
        height:20px;
        float:left;
        padding-left:4px;
        line-height:20px;
        border:#d3d3d3 1px solid;
        border-bottom:#FFF 1px solid;
        color:#666
    }

    .robin-search-form .input-placeholder {
        position:absolute;
        top:3px;
        left:4px;
        color:#999;
        text-align:left;
        cursor:text;
        _z-index:1
    }
    .hd-main .info .disk-capacity {
        position:relative;
        text-align:left
    }
    .hd-main .info .increase-link {
        float:left;
        _margin-top:2px
    }
    .hd-main .info .progress {
        float:left;
        margin:3px 8px 0 5px;
        width:88px;
        height:10px
    }
    .hd-main .info .pro-con {
        position:relative;
        width:100%;
        height:100%;
        border:#1b1b1b 1px solid;
        background-color:#323232
    }
    .hd-main .info .progress .bar {
        position:absolute;
        display:block;
        top:0;
        left:0;
        height:10px;
        background-color:#d4d5d7;
        font-size:0
    }
    .hd-main .info .text {
        float:left;
        margin-top:1px
    }
    .hd-main .info .user-name {
        position:relative;
        padding-left:24px
    }
    .hd-main .info .user-name .name {
        display:inline-block;
        display:inline\0;
        white-space:nowrap;
        max-width:75px;
        overflow:hidden;
        text-overflow:ellipsis;
        vertical-align:bottom
    }
    .hd-main .info .user-name .identity {
        position:absolute;
        top:0;
        left:3px;
        height:16px;
        width:16px;
        background-position:-89px -88px
    }
    .hd-main .info .user-name .is-vip {
        background-position:-89px -68px
    }
    .hd-main .info .user-info, .hd-main .info .more-info {
        top:9px;
        left:auto;
        right:-24px;
        width:116px
    }
    .hd-main .info .notice-nu {
        display:inline-block;
        padding-left:4px;
        background-position:-86px -109px;
        height:14px;
        -webkit-text-size-adjust:none;
        font-size:10px;
        font-style:normal
    }
    .hd-main .info .notice-nu .f-icon {
        display:inline-block;
        padding-right:4px;
        background-position:right -109px;
        color:#FFF
    }
    .hd-main .info .pulldown-canvas-user {
        width:116px;
        height:243px
    }
    .hd-main .info .user-info .arrow {
        left:70px;
        *left:-32px
    }
    .hd-main .info .user-info .content, .hd-main .info .more-info .content {
        padding:10px 0;
        height:180px
    }
    .hd-main .info .more {
        padding:0;
        display:inline;
        line-height:inherit;
        background:none
    }
    .hd-main .info .more-info .content {
        height:280px
    }
    .hd-main .info .pulldown-canvas-more {
        width:116px;
        height:285px
    }
    .hd-main .info .user-info .content a, .hd-main .info .more-info .content a {
        display:block;
        padding-left:33px;
        height:30px;
        line-height:30px;
        color:#888
    }
    .hd-main .info .user-info .content a:hover, .hd-main .info .more-info .content a:hover {
        color:#333;
        text-decoration:none;
        background:#e0e1e5
    }
    .hd-main .info .user-info .li, .hd-main .info .more-info .li {
        display:block;
        padding:2px 0;
        height:30px
    }
    .hd-main .info .user-info .separate-li, .hd-main .info .more-info .separate-li {
        display:block;
        margin:5px 11px;
        border-top:#EBEBEC 1px solid;
        border-bottom:#FFF 1px solid
    }
    .hd-main .info .more-info {
        right:0
    }
    .hd-main .info .more-info .arrow {
        left:94px;
        *left:-8px
    }
    .hd-main .noticelist {
        background:#FFF1C3;
        color:#000;
        text-align:left;
        border-radius:3px;
        border:#DBAF3E 1px solid;
        border-width:0 1px 1px 1px;
        box-shadow:0 2px 4px rgba(0, 0, 0, .2);
        position:relative;
        z-index:1;
        top:40px;
        right:132px;
        width:170px;
        padding-top:12px;
        padding-bottom:10px
    }
    .hd-main .noticelist a {
        display:block;
        height:26px;
        font-size:13px;
        line-height:26px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        border-top:1px dashed #EADBA9;
        margin-left:15px;
        margin-right:15px
    }
    .hd-main .noticelist a:first-child {
        border-top:none
    }
    .hd-main .noticelist .firstchildclass {
        border-top:none
    }
    .hd-main .noticelist .close {
        margin-left:148px;
        *margin-left:140px;
        font-weight:bold;
        color:#AB831B;
        font-style:normal;
        font-size:15px;
        position:absolute;
        top:5px
    }
    .hd-main .noticelist .close:hover {
        color:#DBAF3E;
        cursor:pointer
    }
    .hd-main .noticelist span {
        color:#0063CF;
        font-weight:bold
    }
    .hd-main .info .noticelist a, .hd-main .info .noticelist a:hover, .hd-main .info .noticelist a:active {
        color:#000;
        text-decoration:none;
        cursor:pointer
    }
    .hd-main .info .more-info .noticeinfo {
        right:77px
    }
    .module-error {
        margin-top:182px
    }
    .module-error .error-main {
        margin:0 auto;
        width:420px
    }
    .module-error .label {
        float:left;
        width:160px;
        height:151px;
        background:url('@/assets/image/error.png') 0 0 no-repeat
    }
    .module-error .info {
        margin-left:182px;
        line-height:1.8
    }
    .module-error .title {
        color:#666;
        font-size:14px
    }
    .module-error .reason {
        margin:8px 0 18px 0;
        color:#666
    }

</style>
