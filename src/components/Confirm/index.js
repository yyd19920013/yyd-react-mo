import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {autobind} from 'core-decorators';
import Dialog from 'components/Dialog';
import './style.scss';

@autobind
class Confirm extends React.Component{
    static propTypes={
        parent:PropTypes.object,
        state:PropTypes.string,
        show:PropTypes.bool,
        title:PropTypes.string,
        content:PropTypes.any,
        confirm:PropTypes.func,
        cancel:PropTypes.func,
        lButton:PropTypes.string,
        rButton:PropTypes.string,
        maskClose:PropTypes.bool,
    }

    static defaultProps={
        parent:null,//父组件的this（必填）
        state:null,//父组件控制这个弹窗的state名字，字符串（必填）
        show:false,//父组件控制这个弹窗的state名字，本身（必填）
        title:'弹窗默认标题',//弹窗标题
        content:'',//弹窗主题内容
        confirm:()=>{},//确定触发函数
        cancel:()=>{},//取消触发函数
        lButton:'取消',//左按钮文字
        rButton:'确定',//右按钮文字
        maskClose:true,//点击遮罩是否关闭
    }

    /*
        <Confirm
            parent={this}
            state="show"
            show={show}
            title="修改密码"
            content={<h1>我是内容</h1>}
            confirm={()=>{console.log('确定')}}
            cancel={()=>{console.log('取消')}}
            lButton="取消"
            rButton="确定"
        />
    */

    /*
        $confirm.show({
            title:'修改密码',
            content:<h1>我是内容</h1>,
            confirm:()=>{console.log('确定')},
            cancel:()=>{console.log('取消')},
            lButton:'取消',
            rButton:'确定',
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
                cancel:()=>{},//取消触发函数
                lButton:'取消',//左按钮文字
                rButton:'确定',//右按钮文字
                maskClose:true,//点击遮罩是否关闭
            },
            parent:this,
            state:'show',
            show:false,
        };
    }

    clickHandle(bool){
        const {isMethod,option}=this.state;
        const {parent,state}=!isMethod?this.props:this.state;
        const {confirm,cancel}=!isMethod?this.props:option;
        const This=!isMethod?parent:this;

        This.setState({
            [state]:false,
        });

        bool?confirm&&confirm():cancel&&cancel();
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
        const {title,content,lButton,rButton,maskClose}=!isMethod?this.props:option;

        return(
            <div className="Confirm">
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
                            <span onClick={(ev)=>{this.clickHandle(false)}}>{lButton}</span>
                            <span onClick={(ev)=>{this.clickHandle(true)}}>{rButton}</span>
                        </div>
                    </Dialog>
                    :
                    ''
                }
            </div>
        )
    }
}

let dom=document.getElementById('ConfirmWrap');

if(!dom){
    dom=document.createElement('div');
    dom.id='ConfirmWrap';
    document.body.appendChild(dom);
}

let $confirm=null;

ReactDom.render(<Confirm ref={(dom)=>{
    $confirm=dom;
}} />,dom);

export{
    Confirm,
    $confirm,
};