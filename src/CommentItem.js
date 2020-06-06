import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser';

class CommentItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.content.map((c) =>
                    <Item comment={c}
                          name={this.props.name}
                    />
                )}
                <div className="-mb-16">
                    <br/><br/><br/><br/><br/>
                </div>
            </div>
        );
    }
}

function Item(props) {
    return (
        <span className="">
            {props.comment.dateTime}
            {ReactHtmlParser(props.comment.commentHtml)}
            {(props.name==='unqualified')?<ErrorBag error={props.comment.errorMessage}/>:''}
        </span>
    );
}

function ErrorBag(props){
    return(
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">{props.error}</strong>
            </div>
    );
}
export default CommentItem;