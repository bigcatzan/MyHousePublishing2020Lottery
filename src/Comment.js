import React, {Component} from 'react';
import CommentItem from './CommentItem';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event) {
        event.preventDefault();
        this.props.onClick(event.target.name);
    }

    render() {
        return (
            <div className="w-1/2">
                <ul className="flex border-b">
                    {this.props.list.map((i) =>
                        <li className="-mb-px mr-1">
                            <a href="#" key={i.toString()} name={i.name} onClick={this.handleClick} className="inline-block py-2 px-4 active:border-0">
                                {i.title}({i.content.length})
                            </a>
                        </li>
                    )}
                </ul>
                <div>
                    {this.props.list.map((i) =>
                        (i.active) ? <CommentItem content={i.content}
                                                  name={i.name}/> : ''
                    )}
                </div>
            </div>
        );
    }
}

export default Comment;