import CommentBox from "./CommentBox";

const ulSelector = 'ul._7791';

export function getOriginalList(origin) {
    let el = document.createElement('html');
    el.innerHTML = origin;
    const ul = el.querySelectorAll(ulSelector);
    const originLi = ul[0].querySelectorAll('div[aria-label^="留言"]');

    let originList=[];
    for (let i = 0; i < originLi.length; i++) {

        const c=new CommentBox(originLi[i]);
        originList.push(c);
    }

    return originList;

}

export function getFilteredList(originalList = [], filter=[]) {

    let qualified = [];
    let unqualified = [];

    for (let i = 0; i < originalList.length; i++) {

        const comment = originalList[i];
        if (!checkIfIncludeAllText(comment.commentText, filter['mainText'])) {
            comment.setErrorType('notIncludeAllText');
            unqualified.push(comment);
            continue;
        }

        if (!checkIfIncludeOneCat(comment.commentText, filter['cat'])) {
            comment.setErrorType('notIncludeOneCat');
            unqualified.push(comment);
            continue;
        }

        if (!(comment.taggedNumber >= filter['taggedNumber'])) {
            comment.setErrorType('invalidTaggedNumber');
            unqualified.push(comment);
            continue;
        }

        if (!checkIfNotExpired(comment.timestamp, filter['expiredAt'])) {
            comment.setErrorType('hasExpired');
            unqualified.push(comment);
            continue;
        }

        qualified.push(comment);
    }

    let userIdList=qualified.map(q=>q.profileUserId);
    let map = userIdList.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    let countList=[...map.entries()];
    for(let k = 0; k < countList.length; k++){
        let userId=countList[k][0];
        let count=countList[k][1];
        while(count>1){
            let findId=qualified.findIndex(q=>q.profileUserId===userId);
            let find=qualified[findId];
            qualified.splice(findId, 1);
            unqualified.push(find);
            count--;
        }
    }
    return {qualified: qualified, unqualified: unqualified};

}

function checkIfIncludeAllText(commentText, mainTextFilter) {
    const mainText = stringToArray(mainTextFilter);
    let includeAllText = true;
    for (let i = 0; i < mainText.length; i++) {
        if (commentText===null || !commentText.includes(mainText[i])) {
            includeAllText = false;
            break;
        }
    }
    return includeAllText;
}

function checkIfIncludeOneCat(commentText, catFilter) {

    const cat = stringToArray(catFilter);
    let includeOneCat = false;
    for (let i = 0; i < cat.length; i++) {
        if (commentText.includes(cat[i])) {
            includeOneCat = true;
            break;
        }
    }
    return includeOneCat;
}

function checkIfNotExpired(timestamp, expiredAtFilter) {
    if(!expiredAtFilter)return true;
    const expiredAt = parseDateTimeToTimestamp(stringToArray(expiredAtFilter));
    return expiredAt >= timestamp;
}

function parseDateTimeToTimestamp(dateTime) {
    const timestamp = new Date(dateTime).getTime();
    return timestamp / 1000;
}

function stringToArray(string, separator = ',') {
    return (!string)?[]:string.split(separator).filter(function (el) {
        return el;
    });
}

export function getFilter(input) {

    let filter = {};
    for (let i = 0; i < input.length; i++) {
        const name=input[i].name;
        const value=input[i].value;
        if (name !== 'dom') {
            filter[name]=value;
        }
    }
    return filter;
}

// https://stackoverflow.com/questions/19269545
export function getRandomArray(arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}