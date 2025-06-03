using BBTools.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace BBTools.Infrastructure.Repositories
{
    public class BBRepository : BaseRepository
    {
        public BBRepository(IDbContextFactory<BBContext> dbContextFactory) : base(dbContextFactory)
        {
            
        }
    }
}