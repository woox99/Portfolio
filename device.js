let test = 'test';

// ##### DEVICE PROJECT BUTTONS ######
const iphone = document.querySelectorAll('.iphone');
const macbook = document.querySelectorAll('.macbook');
const iphoneBtn = document.querySelectorAll('.iphone-btn');
const macbookBtn = document.querySelectorAll('.macbook-btn');

// Takes project number for argument
const showIphone = (projectNum) => {
    // console.log(iphone)
    macbook[projectNum - 1].style.display = 'none';
    iphone[projectNum - 1].style.display = 'block';
    iphone[projectNum - 1].style.transform = 'scale(1.25)';

    setTimeout(() => {
        iphone[projectNum - 1].style.transform = 'scale(1.0)';
    }, 0);

    iphoneBtn[projectNum - 1].style.backgroundColor = '#d6e2e725';
    iphoneBtn[projectNum - 1].style.border = '1px solid #d6e2e775';
    
    macbookBtn[projectNum - 1].style.backgroundColor = '#d6e2e700';
    macbookBtn[projectNum - 1].style.border = '1px solid #d6e2e750';
}

const showMacbook = (projectNum) => {
    iphone[projectNum - 1].style.display = 'none';
    macbook[projectNum - 1].style.display = 'block';
    macbook[projectNum - 1].style.transform = 'scale(1.25)';

    setTimeout(() => {
        macbook[projectNum - 1].style.transform = 'scale(1.0)';
    }, 0);

    macbookBtn[projectNum - 1].style.backgroundColor = '#d6e2e725';
    macbookBtn[projectNum - 1].style.border = '1px solid #d6e2e775';
    
    iphoneBtn[projectNum - 1].style.backgroundColor = '#d6e2e700';
    iphoneBtn[projectNum - 1].style.border = '1px solid #d6e2e750';
}
