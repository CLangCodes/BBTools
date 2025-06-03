using System.Text.Json.Serialization;

namespace BBTools.Domain.Models
{
    public class Antigen
    {
        public string ISBTNumber { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int SystemId { get; set; }
        public string SystemName { get; set; } = string.Empty;

        // Navigation property
        [JsonIgnore]
        public AntigenSystem? AntigenSystem { get; set; }
    }
}