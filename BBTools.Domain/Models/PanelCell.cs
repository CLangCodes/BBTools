namespace BBTools.Domain.Models
{
    public class PanelCell
    {
        public string Manufacturer { get; set; } = string.Empty;
        public string Lot { get; set; } = string.Empty;
        public DateOnly ExpirationDate { get; set; }
        public int PanelCellNumber { get; set; }
        public enum Typing
        {
            Positive,
            Negative,
            Untested
        }
        public Typing D { get; set; }
        public Typing C { get; set; }
        public Typing LittleC { get; set; }
        public Typing E { get; set; }
        public Typing LittleE { get; set; }
        public Typing F { get; set; }
        public Typing Cw { get; set; }
        public Typing Vell { get; set; }
        public Typing Kell { get; set; }
        public Typing Cellano { get; set; }
        public Typing Kpa { get; set; }
        public Typing Kpb { get; set; }
        public Typing Jsa { get; set; }
        public Typing Jsb { get; set; }
        public Typing Fya { get; set; }
        public Typing Fyb { get; set; }
        public Typing Jka { get; set; }
        public Typing Jkb { get; set; }
        public Typing Xga { get; set; }
        public Typing Lea { get; set; }
        public Typing Leb { get; set; }
        public Typing S { get; set; }
        public Typing LittleS { get; set; }
        public Typing M { get; set; }
        public Typing N { get; set; }
        public Typing P1 { get; set; }
        public Typing Lua { get; set; }
        public Typing Lub { get; set; }
        public Typing HLAPos { get; set; }
    }
}
