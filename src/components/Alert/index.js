import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import Dialog from 'components/Dialog';
import './style.scss';

@autobind
class Alert extends React.Component{
    static propTypes={
        parent:PropTypes.object,
        state:PropTypes.string,
        show:PropTypes.bool,
        title:PropTypes.string,
        content:PropTypes.any,
        confirm:PropTypes.func,
        button:PropTypes.string,
        maskClose:PropTypes.bool,
    }

    static defaultProps={
        parent:null,//父组件的this（必填）
        state:null,//父组件控制这个弹窗的state名字，字符串（必填）
        show:false,//父组件控制这个弹窗的state名字，本身（必填）
        title:'弹窗默认标题',//弹窗标题
        content:'',//弹窗主题内容
        confirm:()=>{},//确定触发函数
        button:'确定',//按钮文字
        maskClose:true,//点击遮罩是否关闭
    }

    /*
        <Alert
            parent={this}
            state="show1"
            show={show1}
            title="我是第一个弹窗"
            content="我是第一个弹窗的内容"
            confirm={()=>{console.log('第一个弹窗被点击了')}}
            button="确定"
        />
    */

    /*
        $alert.show({
            title:'我是第一个弹窗',
            content:'我是第一个弹窗的内容',
            confirm:()=>{console.log('第一个弹窗被点击了')},
            button:'确定',
        });
    */

    constructor(props){
        super(props);
        this.state={
            isMethod:false,
            option:{
                title:'弹窗默认标题',//弹窗标题
                content:'',//弹窗主题内容
                confirm:()=>{},//确定触发函数
                button:'确定',//按钮文字
                maskClose:true,//点击遮罩是否关闭
            },
            parent:this,
            state:'show',
            show:false,
        };
    }

    clickHandle(){
        const {isMethod,option}=this.state;
        const {parent,state}=!isMethod?this.props:this.state;
        const {confirm}=!isMethod?this.props:option;
        const This=!isMethod?parent:this;

        This.setState({
            [state]:false,
        });

        confirm&&confirm();
    }

    show(option){
        this.setState({
            isMethod:true,
            show:true,
        },()=>{
            option=Object.assign(this.state.option,option);

            this.setState({
                option,
            });
        });
    }

    render(){
        const {isMethod,option}=this.state;
        const {parent,state,show}=!isMethod?this.props:this.state;
        const {title,content,button,maskClose}=!isMethod?this.props:option;

        return(
            <div className="Alert">
                {
                    show?
                    <Dialog
                        parent={parent}
                        state={state}
                        showDialog={show}
                        title={title||'弹窗'}
                        content={content}
                        maskClose={maskClose}
                    >
                        <div className="main">
                            {content}
                        </div>

                        <div className="end1">
                            <span onClick={(ev)=>{this.clickHandle()}}>{button}</span>
                        </div>
                    </Dialog>
                    :
                    ''
                }
            </div>
        )
    }
}

let dom=document.getElementById('AlertWrap');

if(!dom){
    dom=document.createElement('div');
    dom.id='AlertWrap';
    document.body.appendChild(dom);
}

let $alert=null;

ReactDom.render(<Alert ref={(dom)=>{
    $alert=dom;
}} />,dom);

export{
    Alert,
    $alert,
};