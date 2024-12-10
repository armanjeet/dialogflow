import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

interface Message {
  from: string;
  text: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements AfterViewChecked {
  isChatOpen = false;
  showQuickReplies = true;
  messages: Message[] = [
    { from: 'agent', text: 'Would you rather talk to a human agent?' }
  ];
  newMessage = '';

  @ViewChild('chatBody') chatBody!: ElementRef;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const newMessageObj: Message = { from: 'customer', text: this.newMessage.trim() };
      this.messages.push(newMessageObj);
      this.newMessage = '';
      this.scrollToBottom();
      this.showQuickReplies = false;
    }
  }

  handleQuickReply(reply: string) {
    this.messages.push({ from: 'customer', text: reply });
    this.showQuickReplies = false;
    this.messages.push({ from: 'agent', text: 'Sure, I’m transferring you to Mike.' });
  }

  scrollToBottom() {
    if (this.chatBody) {
      try {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      } catch (err) {
        console.error(err);
      }
    }
  }

  ngAfterViewChecked() {
    setTimeout(() => this.scrollToBottom(), 0);
  }
}
