
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace signal.Api.Hubs.Clients
{
    public class DrawDotHub : Hub
    {
        public async Task UpdateCanvas (int x, int y)
        {
            await Clients.All.SendAsync("updateDot", x, y);
        }

        public async Task ClearCanvas()
        {
            await Clients.All.SendAsync("clearCanvas");
        }
    }
    
}