import React from 'react';
import {autobind} from 'core-decorators';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {DatePicker,List} from 'antd-mobile';
import Container from 'components/Container';
import Autoplay from 'components/Autoplay';
import PullLoadList from 'components/PullLoadList';
import {qryAllNewSection,getBannerList,qryArticle} from 'services';
import {QSA,customEvent} from 'js/yydjs';
import {browser} from 'src';
import './style.scss';

@autobind
export default class Headline extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataList:[],
            section:0,
        };

        this.onOff=true;
        customEvent.on('resAllSectionEnd',this.getHomePageId);
    }

    componentDidMount(){
        //获取轮播图详情
        (function(This){
            let dataList=[1,2,3].map((item,index)=>({
                src:require('images/bg404.png'),
                link:`/autoplay_detail?id=${item.id}`,
            }));

            This.setState({
                dataList,
            });
            getBannerList((res)=>{
                let dataList=res.data.map((item,index)=>({
                    src:item.bannerImg,
                    link:`/autoplay_detail?id=${item.id}`,
                }));

                This.setState({
                    dataList,
                });
            });
        }(this));

        //获取首页id
        this.getHomePageId();
    }

    getHomePageId(){
        let section=QSA('.Information .scrollWrap li')[0];

        section=section&&section.getAttribute('section');
        if(this.onOff&&section){
            this.onOff=false;
            this.setState({
                section,
            });
        }
    }

    render(){
        const {dataList,section}=this.state;

        return(
            <div className="Headline">
                <Container>
                    <Autoplay
                        dataList={dataList}
                        height="2rem"
                    />

                    <div className={classNames({
                        navWrap:true,
                        aaa:true,
                    })}>
                        <div className="nav">
                            <Link to="/article_info?title=风险提示&name=RiskWarning">
                                风险提示
                            </Link>
                            <Link to="/activity_center">
                                活动中心
                            </Link>
                            <Link to="/advance">
                                进阶必备
                            </Link>
                            <Link to="/article_info?title=关于我们&name=aboutUs">
                                关于我们
                            </Link>
                        </div>
                    </div>
                    <DatePicker
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">Datetime</List.Item>
                    </DatePicker>

                    {
                        section>0&&
                        <PullLoadList
                            api={qryArticle}
                            json={{
                                section,
                            }}
                        />
                    }
                </Container>
            </div>
        )
    }
}