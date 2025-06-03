namespace BBTools.Domain.Models
{
    public class AntigenSystem 
    {
        public int SystemId { get; set; }
        public string SystemName { get; set; } = string.Empty;
        public string[] Genes { get; set; } = [];
        public Antigen[] Antigens { get; set; } = [];
        public string[] PhenoTypes { get; set; } = [];
    }
}