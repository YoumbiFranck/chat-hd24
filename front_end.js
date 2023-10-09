const loader = `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`;
const chatbot = document.querySelector('.chatbot');
const chatbotMessageWindow = document.querySelector('.chatbot__message-window');
const chatbotHeader = document.querySelector('.chatbot__header');

let messages = [];
const chatbotMessages = document.querySelector('.chatbot__messages');
const chatbotSubmit = document.querySelector('.chatbot__submit');
const chatbotInput = document.querySelector('.chatbot__input');



chatbotHeader.addEventListener("click", () =>{
        chatbot.classList.toggle('chatbot--closed');
    }
);

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        httpRequest();
    }
});


chatbotSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    httpRequest();

});

function httpRequest() {
    const  messageText = chatbotInput.value;
    if(messageText){
        const newMessage =  {"role": "user", "content": `${messageText}`};
        messages.push(newMessage);
        chatbotInput.value = '';

        chatbotMessages.innerHTML += `<li class='is-user animation'>
       <p class='chatbot__message'>
         ${messageText}
      </p>
       <span class='chatbot__arrow chatbot__arrow--right'></span>
     </li>`;
        scrollDown();



        fetch('http://localhost:3000', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                // message: messageText
                messages
            })

        }).then(res => res.json())
            .then(data => {
                let newAssistantMessage = {"role": "assistant", "content": `${data.completion.content}`};
                messages.push(newAssistantMessage);
                chatbotMessages.innerHTML += `<li class='is-ai animation' >
             <div class="is-ai__profile-picture">
              <svg class="icon-avatar" viewBox="0 0 32 32">
                <use xlink:href="#avatar" />
               </svg>
             </div>
            <span class='chatbot__arrow chatbot__arrow--left'></span>
            <div class='chatbot__message'>${data.completion.content}</div>
           </li>`
            })
    }
}
// const loader_ai = () => {
//     let isLoading = false;
//     return chatbotMessages.innerHTML += `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`;
// }
//
// const removeLoader = () => {
//     let loadingElem = document.getElementById('is-loading');
//     if (loadingElem) chatbotMessages.removeChild(loadingElem);
// };

const scrollDown = () => {
    const distanceToScroll =
        chatbotMessageWindow.scrollHeight - (
            chatbotMessages.lastChild.offsetHeight + 60);
    chatbotMessageWindow.scrollTop = distanceToScroll;
    return false;
};


