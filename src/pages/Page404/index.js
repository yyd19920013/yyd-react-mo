import React from 'react';
import {autobind} from 'core-decorators';
import {Link} from 'react-router-dom';
import './style.scss';

@autobind
export default class Page404 extends React.Component{
    render(){
        return(
            <div className="Page404">
                <div className="text">
                    <h1>404，该页面不存在！</h1>
                    <Link to="/information/index">返回首页</Link>
                </div>
                <div className="bg"></div>
            </div>
        )
    }
}