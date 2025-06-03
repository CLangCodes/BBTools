namespace BBTools.Domain.Models
{
    public class AntigenSystem 
    {
        public int SystemId { get; set; }
        public string SystemName { get; set; } = string.Empty;
        public string[] Genes { get; set; } = Array.Empty<string>();
        public Antigen[] Antigens { get; set; } = Array.Empty<Antigen>();
        public string[] PhenoTypes { get; set; } = Array.Empty<string>();
    }
}