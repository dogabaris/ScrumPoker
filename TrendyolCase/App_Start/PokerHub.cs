using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Security.Provider;

namespace TrendyolCase
{
    public class PokerHub : Hub
    {
        public static List<SessionDto> SessionList =
            new List<SessionDto>();

        public PokerHub()
        { }

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }

        public void LeaveSession(string sessionName)
        {
            if (string.IsNullOrWhiteSpace(sessionName))
                return;
            var session = SessionList.FirstOrDefault(x => x.Name == sessionName);
            if (session != null)
            {
                var voterIndex = -1;

                for (int i = 0; i < session.StoryList[0].Votes.Count; i++)
                {
                    if (session.StoryList[0].Votes[i].VoterId == Context.ConnectionId)
                    {
                        voterIndex = i;
                        break;
                    }
                }

                if (voterIndex > -1)
                {
                    Groups.Add(Context.ConnectionId, sessionName);

                    foreach (var story in session.StoryList)
                    {
                        story.Votes[voterIndex].VoterId = null;
                    }

                    Clients.Group(sessionName).LeaveSessionResult(session);
                }
            }
        }

        public void JoinSession(string sessionName)
        {
            if (string.IsNullOrWhiteSpace(sessionName))
                return;

            var session = SessionList.FirstOrDefault(x => x.Name == sessionName);
            if (session == null)
            {
                Clients.Caller.JoinSessionResult("There is no such session!");
                return;
            }

            var emptyIndex = -1;
            
            for (int i = 0; i < session.StoryList[0].Votes.Count; i++)
            {
                if (string.IsNullOrWhiteSpace(session.StoryList[0].Votes[i].VoterId))
                {
                    emptyIndex = i;
                    break;
                }
            }

            if (emptyIndex > -1)
            {
                Groups.Add(Context.ConnectionId, sessionName);

                foreach (var story in session.StoryList)
                {
                    story.Votes[emptyIndex].VoterId = Context.ConnectionId;
                }

                //var votes = session.StoryList.Select(y =>
                //{
                //    y.Votes[emptyIndex].VoterId = Context.ConnectionId;
                //    return y;
                //});

                Clients.Group(sessionName).JoinSessionResult(session);
            }
            else
                Clients.Caller.JoinSessionResult("Session is full!");
        }

        public void SendFinalScore(string sessionName, string storyName, int activeStoryIndex, int finalScore)
        {
            var session = SessionList.FirstOrDefault(x => x.Name == sessionName);
            var story = session.StoryList.FirstOrDefault(y => y.StoryName == storyName);
            story.StoryPoint = finalScore;
            story.Status = 1;

            if (activeStoryIndex + 1 < session.StoryList.Count)
            {
                session.StoryList[activeStoryIndex + 1].Status = 0;

                Clients.Group(sessionName).SendFinalScoreResult(session);
            }
            else
            {
                Clients.Group(sessionName).SessionFinished("Session Finished!");
                Clients.Group(sessionName).SendFinalScoreResult(session);
            }
        }

        public void SendVote(string sessionName, string storyName, int storyPoint)
        {
            //Session.Name==sessionName -> StoryList.Name==storyName -> Votes.StoryPoint=storyPoint

            var session = SessionList.First(x => x.Name == sessionName);
            var story = session.StoryList.First(y => y.StoryName == storyName);
            var vote = story.Votes.First(z => z.VoterId == Context.ConnectionId);
            vote.StoryPoint = storyPoint;

            Clients.Group(sessionName).SendVoteResult(session);

            //var session = new SessionDto();
            //foreach (var ses in SessionList)
            //{
            //    if (ses.Name == sessionName)
            //    {
            //        foreach (var story in ses.StoryList)
            //        {
            //            if (story.StoryName == storyName)
            //            {
            //                foreach (var vote in story.Votes)
            //                {
            //                    if (vote.VoterId == Context.ConnectionId)
            //                    {
            //                        vote.StoryPoint = storyPoint;
            //                        //session = ses;
            //                        Clients.Group(sessionName).SendVoteResult(ses);
            //                        return;
            //                    }
            //                }
            //                break;
            //            }
            //        }
            //        break;
            //    }
            //}
        }

        public void CreateSession(string sessionName, int numberVoters, List<string> stories)
        {
            Groups.Add(Context.ConnectionId, sessionName);
            
            var storyList = new List<Story>();

            for (var i = 0; i < stories.Count; i++)
            {
                var votes = new List<Vote>();

                for (var j = 0; j < numberVoters; j++)
                {
                    if (j == numberVoters - 1)
                        votes.Add(new Vote { StoryPoint = null, VoterId = Context.ConnectionId, VoterName = "Scrum Master" });
                    else
                        votes.Add(new Vote { StoryPoint = null, VoterId = null, VoterName = "Voter " + (j + 1) });
                }

                if (i == 0)
                    storyList.Add(new Story { StoryName = stories[i], Status = 0, StoryPoint = null, Votes = votes });
                else
                    storyList.Add(new Story { StoryName = stories[i], Status = 2, StoryPoint = null, Votes = votes });
            }

            var newSession = new SessionDto
            {
                Name = sessionName,
                NumberVoters = numberVoters,
                StoryList = storyList,
            };
            SessionList.Add(newSession);
            Clients.Caller.CreateSessionResult(newSession);
        }

        public void Send(string name, string message)
        {
            Clients.All.broadcastMessage(name, message);
        }
    }

    public class SessionDto
    {
        public string Name { get; set; }
        public int NumberVoters { get; set; }
        public List<Story> StoryList { get; set; }
    }

    public class Story
    {
        public string StoryName { get; set; }
        public int? StoryPoint { get; set; }
        public int? Status { get; set; } // 0 = active, 1 = voted, 2 = not voted
        public List<Vote> Votes { get; set; }
    }

    public class Vote
    {
        public string VoterId { get; set; }
        public string VoterName { get; set; }
        public int? StoryPoint { get; set; }
    }
}