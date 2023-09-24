let test = 'test';
const iphone = document.querySelector('.iphone');
const macbook = document.querySelector('.macbook');
const iphoneBtn = document.querySelector('.iphone-btn');
const macbookBtn = document.querySelector('.macbook-btn');

const showIphone = () => {
    macbook.style.display = 'none';
    iphone.style.display = 'block';
    iphone.style.transform = 'scale(1.5)';

    setTimeout(() => {
        iphone.style.transform = 'scale(1.0)';
    }, 100);

    iphoneBtn.style.backgroundColor = '#d6e2e725';
    iphoneBtn.style.border = '1px solid #d6e2e775';
    
    macbookBtn.style.backgroundColor = '#d6e2e700';
    macbookBtn.style.border = '1px solid #d6e2e750';
}

const showMacbook = () => {
    iphone.style.display = 'none';
    macbook.style.display = 'block';
    macbook.style.transform = 'scale(1.5)';

    setTimeout(() => {
        macbook.style.transform = 'scale(1.0)';
    }, 100);

    macbookBtn.style.backgroundColor = '#d6e2e725';
    macbookBtn.style.border = '1px solid #d6e2e775';
    
    iphoneBtn.style.backgroundColor = '#d6e2e700';
    iphoneBtn.style.border = '1px solid #d6e2e750';
}