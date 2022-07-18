function light2dark() {
    const liList = document.getElementsByClassName("li-item-light");

    //傻逼js!!!!!!!!!!!!!!!
    // if (liList.length > 0) {
    //     for (let i = 0; i < liList.length; i++) {
    //         liList[i].className = "li-item-dark";
    //     }
    // }
    while (liList.length > 0) {
        liList[0].className = "li-item-dark";
    }
    const menList = document.getElementsByClassName("men-bar");
    menList[0].style.backgroundColor = "var(--color-black)";
}

function dark2light() {
    const liList = document.getElementsByClassName("li-item-dark");
    // if (liList.length > 0) {
    //     for (let i = 0; i < liList.length; i++) {
    //         liList[i].className = "li-item-light";
    //     }
    // }
    while (liList.length > 0) {
        liList[0].className = "li-item-light";
    }
    const menList = document.getElementsByClassName("men-bar");
    menList[0].style.backgroundColor = "transparent";
}

export {light2dark, dark2light}