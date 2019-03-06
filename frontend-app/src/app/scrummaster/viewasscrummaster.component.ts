import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConnectionResolver } from '../helpers/signalResolver';
import { BroadcastEventListener } from 'ng2-signalr';

@Component({
  selector: 'app-viewasscrummaster',
  templateUrl: './viewasscrummaster.component.html',
})
export class ViewAsScrumMasterComponent implements OnInit {
  baseUrl;
  sessionName;
  session;
  activeStory;
  activeStoryIndex;
  sentVote;
  isAllVoted = false;
  finalScore = 0;
  sessionFinished = false;
  constructor(private toastr: ToastrService,
    private router: Router, private route: ActivatedRoute, private connectionResolver: ConnectionResolver) {
  }

  checkIfEveryBodyVote() {
    for (var i = 0; i < this.session.StoryList[this.activeStoryIndex].Votes.length; i++) {
      if (this.session.StoryList[this.activeStoryIndex].Votes[i].StoryPoint == null) {
        console.log("storypoint", this.session.StoryList[this.activeStoryIndex].Votes[i].StoryPoint);
        this.isAllVoted = false;
        return;
      }
    }
    console.log("isallvoted true");
    this.isAllVoted = true;
  }

  sendFinalScore() {
    if (this.finalScore != 0 || !this.finalScore) {
      this.connectionResolver.getSignalR().then((c) => {
        c.invoke('SendFinalScore', this.sessionName, this.activeStory, this.activeStoryIndex, this.finalScore).then(() => {
          //Temizlenecekler var.
        });
      });
    }
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
    //this.sessionName = this.route.snapshot.params.sessionName;
    this.route.params.subscribe(paramsId => {
      this.sessionName = paramsId.sessionName;
      this.baseUrl = window.location.origin;
    });

    this.connectionResolver.getSignalR().then((c) => {
      let onCreateSession = new BroadcastEventListener('CreateSessionResult');
      let onSendVote = new BroadcastEventListener('SendVoteResult');
      let onJoinSession = new BroadcastEventListener('JoinSessionResult');
      let onSendFinalScore = new BroadcastEventListener('SendFinalScoreResult');
      let onSessionFinished = new BroadcastEventListener('SessionFinished');
      c.listen(onSessionFinished);
      c.listen(onJoinSession);
      c.listen(onCreateSession);
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
        this.finalScore = 0;
        this.checkIfEveryBodyVote();
      });

      onJoinSession.subscribe((result: any) => {
        console.log("JoinSessionResult: ", result);
        this.session = result;
      });

      onSendVote.subscribe((result: any) => {
        console.log("SendVoteResult: ", result);
        this.session = result;
        this.checkIfEveryBodyVote();
      });

      onCreateSession.subscribe((result: any) => {
        console.log("CreateSessionResult: ", result);
        this.session = result;
        this.setActiveStory();
      });
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
