using System.Collections.Generic;
using System.Threading.Tasks;
using signal.Api.Models;

namespace signal.Api.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);

        Task ShowAllMessages(List<ChatMessage> messages);
    }
}