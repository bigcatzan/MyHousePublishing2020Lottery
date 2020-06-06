class CommentBox {

    constructor(originDivString) {
        this.errorBag={
            notIncludeAllText:'缺少必填文字',
            notIncludeOneCat:'缺少《世界野貓圖鑑》的貓科動物',
            invalidTaggedNumber:'沒有成功tag好友3位',
            hasExpired:'超過截止時間'
        };
        this.originDivString = originDivString;
        this.commentSelector = 'span._3l3x';
        this.personASelector = 'a._6qw4';
        this.personTaggedSelector = 'a[data-hovercard^="/ajax/hovercard/user"';
        this.errorType='';
    }

    get url() {
        let url = new URL(this.person.href);
        url.hostname = 'facebook.com';
        return url;
    }

    get profileLink() {
        return this.url.href;
    }

    get profileUserId() {
        return this.url.searchParams.has('id') ? this.url.searchParams.get('id') : this.url.pathname;
    }

    get name() {
        return this.person.textContent;
    }

    get person() {
        return this.originDivString.querySelector(this.personASelector);
    }

    get commentText() {
        let comment= this.originDivString.querySelectorAll(this.commentSelector)[0];
        if (comment != null)return comment.textContent;
        return null;
    }

    get commentHtml() {
        return this.originDivString.innerHTML;
    }

    get taggedNumber() {
        return this.originDivString.querySelectorAll(this.commentSelector)[0].querySelectorAll(this.personTaggedSelector).length;
    }

    get timestamp() {
        return this.originDivString.querySelectorAll('abbr[data-tooltip-content]')[0].getAttribute('data-utime');
    }

    get dateTime() {
        return this.originDivString.querySelectorAll('abbr[data-tooltip-content]')[0].getAttribute('data-tooltip-content');
    }

    get errorMessage(){
        if (this.errorType){
            return this.errorBag[this.errorType];
        }
        return '已有其他符合資格的留言，本筆無效';


    }

    setErrorType(errorType){
        this.errorType=errorType;
    }
}

export default CommentBox;