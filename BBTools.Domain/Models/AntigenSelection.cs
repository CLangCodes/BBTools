namespace BBTools.Domain.Models
{
    public class AntigenSelection
    {
        public string Name { get; set; } = string.Empty;
        public decimal Frequency { get; set; }
        public bool IsSelected { get; set; } = false;
    }
}
