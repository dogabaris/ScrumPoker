import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConnectionResolver } from '../helpers/signalResolver';
import { BroadcastEventListener } from 'ng2-signalr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewasdeveloper',
  templateUrl: './viewasdeveloper.component.html',
})

export class ViewAsDeveloperComponent implements OnInit {
  sessionName;
  session;
  isSessionFull = false;
  activeStory;
  activeStoryIndex;
  sentVote;
  sessionFinished = false;
  noSuchSession = false;

  constructor(private toastr: ToastrService, private connectionResolver: ConnectionResolver, private route: ActivatedRoute) {

  }

  sendVote(storyPoint) {
    this.connectionResolver.getSignalR().then((c) => {
      c.invoke('SendVote', this.sessionName, this.activeStory, storyPoint).then(() => {
        this.sentVote = storyPoint;
      });
    });
  }

  showSuccess(msg) {
    this.toastr.success(msg,
      'Success',
      {
        timeOut: 3000
      });
  }

  ngOnInit() {
    this.route.params.subscribe(paramsId => {
      this.sessionName = paramsId.sessionName;
      console.log("sessionname ", this.sessionName);
    });

    this.connectionResolver.getSignalR().then((c) => {
      let onJoinSession = new BroadcastEventListener('JoinSessionResult');
      let onSendVote = new BroadcastEventListener('SendVoteResult');
      let onSendFinalScore = new BroadcastEventListener('SendFinalScoreResult');
      let onSessionFinished = new BroadcastEventListener('SessionFinished');
      c.listen(onSessionFinished);
      c.listen(onJoinSession);
      c.listen(onSendVote);
      c.listen(onSendFinalScore);

      onSessionFinished.subscribe((result: any) => {
        console.log("SessionFinished: ", result);
        this.sessionFinished = true;
        this.showSuccess(result);
      });

      onSendFinalScore.subscribe((result: any) => {
        console.log("SendFinalScoreResult: ", result);
        this.session = result;
        this.setActiveStory();
        this.sentVote = null;
      });
      onJoinSession.subscribe((result: any) => {
        console.log("JoinSessionResult: ", result);

        if (result === "Session is full!")
          this.isSessionFull = true;
        else if (result === "There is no such session!")
          this.noSuchSession = true;
        else {
          this.session = result;
          this.setActiveStory();
        }
      });

      onSendVote.subscribe((result: any) => {
        console.log("SendVoteResult: ", result);
        this.session = result;
      });

      c.invoke('JoinSession', this.sessionName).then(() => {});
    });
  }

  setActiveStory() {
    for (var i = 0; i < this.session.StoryList.length; i++) {
      if (this.session.StoryList[i].Status === 0) {
        this.activeStory = this.session.StoryList[i].StoryName;
        this.activeStoryIndex = i;
      }
    }
  }
}
