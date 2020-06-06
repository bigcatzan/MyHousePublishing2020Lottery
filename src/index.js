import React, {Component} from 'react';
import Form from './Form';
import Comment from './Comment';
import ReactDOM from 'react-dom';
import './index.css';
import {getOriginalList,getFilter,getFilteredList,getRandomArray} from './parseComment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {input: [
                {name:'dom', title:'FB留言原始碼', value:''},
                {name:'mainText', title:'必填文字', value:''},
                {name:'cat', title:'《世界野貓圖鑑》的貓科動物', value:''},
                {name:'taggedNumber', title:'tag的好友數', value:'3'},
                {name:'expiredAt', title:'留言截止日期', value:''},
                {name:'winnerCount', title:'抽出幾位', value:'3'}
            ],
            filter: [],
            list: [
                {name: 'origin', title: '所有留言', content: [], active:true},
                {name: 'qualified', title: '條件符合', content: [], active:false},
                {name: 'unqualified', title: '條件不符合', content: [], active:false},
                {name: 'winner', title: '中獎留言', content: [], active:false}
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(input) {
        let filter=getFilter(input);
        this.setState({input:input,
            filter:filter
        });
        let listCopy=this.state.list;
        let originalList =getOriginalList(input.find((l) => l.name === 'dom').value);
        listCopy.find( (li)=>li.name==='origin').content=originalList;
        listCopy.find( (li)=>li.name==='qualified').content=getFilteredList(originalList, filter).qualified;
        listCopy.find( (li)=>li.name==='unqualified').content=getFilteredList(originalList, filter).unqualified;
        this.setState({list:listCopy});
        //filter string
    }

    handleSubmit() {
        let listCopy=this.state.list;
        listCopy.find( (li)=>li.name==='winner').content=getRandomArray(
            this.state.list.find((li)=>li.name==='qualified').content,
            this.state.input.find((i)=>i.name==='winnerCount').value);
        this.setState({list:listCopy});
    }

    handleClick(name){
        let listCopy=this.state.list;
        listCopy.forEach( function(li){
            li.active=(li.name===name);
        });
        this.setState({list:listCopy});
    }


    render() {
        return (
        <div className="flex -mb-8">
            <Form onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  input={this.state.input}/>
            <Comment filter={this.state.filter}
                     list={this.state.list}
                     onClick={this.handleClick}
            />
        </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
