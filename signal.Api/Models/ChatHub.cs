
using System.Linq;
using System.Threading.Tasks;
using signal.Api.Hubs.Clients;
using signal.Api.Models;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;

namespace signal.Api.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private readonly WhiteBoardDBContext _context;

        public ChatHub(WhiteBoardDBContext wc)
        {
            _context = wc;   
        }
        public async Task SendMessage(ChatMessage message)
        {
            _context.Messages.Add(message);
            _context.SaveChanges();

            await Clients.All.ReceiveMessage(message);
        }

        public async Task AllMessages(){
            List<ChatMessage> messages = _context.Messages.AsQueryable().ToList();
            await Clients.All.ShowAllMessages(messages);
        }
    }
}