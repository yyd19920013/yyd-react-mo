import React from 'react';
import {autobind} from 'core-decorators';
import {Switch,Route} from 'react-router-dom';
import {browser} from 'src';
import Information from 'pages/Information';
import Page404 from 'pages/Page404';
import {Alert,$alert} from 'components/Alert';
import {$confirm} from 'components/Confirm';
import {routerChange,getStyle,lStore,strToJson,customEvent,AddClass,routerMap,getPrevPathname} from 'js/yydjs';
import './style.scss';

@autobind
export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isWechat:false,
            showHint:false,
        };

        this.pathname='';
        this.search=strToJson();

        customEvent.on('needLogin',this.showHint);
    }

    componentWillMount() {

    }

    componentDidMount(){
        //重定向到首页
        this.redirectHome('/information/index');

        // $confirm.show({
        //     title:'修改密码',
        //     content:<h1>我是内容</h1>,
        //     confirm:()=>{
        //         console.log('确定')
        //         $alert.show({
        //             title:'修改密码',
        //             content:'确定修改密码',
        //             confirm:()=>{console.log('修改密码了')},
        //             button:'确定',
        //         });
        //     },
        //     cancel:()=>{console.log('取消')},
        //     lButton:'取消',
        //     rButton:'确定',
        // });
    }

    componentDidUpdate(){
        //每次页面切换都回到顶部
        this.goTop();

        //存储路由
        this.saveRoute();
    }

    componentWillUnmount(){
        customEvent.remove('needLogin',this.showHint);
    }

    redirectHome(url){
        if(browser.location.pathname=='/')browser.replace(url);
    }

    goTop(){
        if(this.pathname!=browser.location.pathname){
            this.pathname=browser.location.pathname;
            routerChange();
            this.hideHint();
        }
    }

    saveRoute(){
        let blacklist=[];
        let {pathname,search}=browser.location;

        if(!routerMap.length||routerMap.length&&blacklist.indexOf(pathname)==-1&&routerMap[routerMap.length-1]!=pathname){
            routerMap.push(pathname);
        }
    }

    showHint(){
        this.setState({
            showHint:true,
        });
    }

    hideHint(){
        this.setState({
            showHint:false,
        });
    }

    render(){
        const {showHint}=this.state;

        return(
            <div className="Home">
                <Switch>
                    <Route path="/information" component={Information} />
                    <Route path="/*" component={Page404} />
                </Switch>

                <Alert
                    parent={this}
                    state="showHint"
                    show={showHint}
                    title="提醒"
                    content="您还未登录，请先登录"
                    confirm={()=>{
                        browser.push('/login');
                    }}
                    button="确定"
                    maskClose={false}
                />
            </div>
        )
    }
}
