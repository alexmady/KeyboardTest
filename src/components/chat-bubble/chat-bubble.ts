import { Component } from '@angular/core';

@Component({
    selector: 'chat-bubble',
    templateUrl: 'chat-bubble.html',
    inputs: ['msg: message'],
})
export class ChatBubble {
    public msg: any;
    constructor() {
        this.msg = {
            content: 'Am I dreaming?',
            position: 'left',
            time: '12/3/2016',
            senderName: 'Gregory'
        }
    }
}
