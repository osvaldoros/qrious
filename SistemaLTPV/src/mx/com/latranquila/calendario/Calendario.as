package mx.com.latranquila.calendario
{
    public class Calendario implements ICalendar
    {
        /**
         * The default date of the change from the Julian to the Gregorian calendar is 15th of October, 1582.
         * If this is wrong in your case you can set it in the constructor.
         */
        private var __gregorianChange:SimpleDate;
 
        /**
         * Currently implemented calendar.
         * Depending on the date assigned and the __gregorianChange property it will be automatically switched to GregorianCalendar or JulianCalendar
         */
        private var __calendarImpl:BaseCalendar;
 
        public static var monthNames:Array =
        [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
 
        public static const MILLISECONDS_PER_DAY:Number = 1000 * 60 * 60 * 24;
        public static const JANUARY:uint = 0;
        public static const FEBRUARY:uint = 1;
        public static const MARCH:uint = 2;
        public static const APRIL:uint = 3;
        public static const MAY:uint = 4;
        public static const JUNE:uint = 5;
        public static const JULY:uint = 6;
        public static const AUGUST:uint = 7;
        public static const SEPTEMBER:uint = 8;
        public static const OCTOBER:uint = 9;
        public static const NOVEMBER:uint = 10;
        public static const DECEMBER:uint = 11;
 
        public function Calendario( year:Number=1970, month:Number=0, date:Number=1, customGregorianChange:SimpleDate=null )
        {
            if( customGregorianChange == null )
            {
                __gregorianChange = new SimpleDate( 1582, OCTOBER, 15 );
            }
            else
            {
                __gregorianChange = customGregorianChange;
            }
            __calendarImpl = new GregorianCalendar();
            this.year = year;
            this.month = month;
            this.date = date;
        }
 
        private function adjustCalendarImpl():void
        {
            if(
                ( year> __gregorianChange.year ) ||
                ( year == __gregorianChange.year && month> __gregorianChange.month ) ||
                ( year == __gregorianChange.year && month == __gregorianChange.month && date>= __gregorianChange.date )
            )
            {
                if( !isGregorian )
                {
                    __calendarImpl = new GregorianCalendar( year, month, date );
                }
            }
            else
            {
                if( isGregorian )
                {
                    __calendarImpl = new JulianCalendar( year, month, date );
                }
            }
        }
 
        public function toString( format:String="%y/%m/%d" ):String
        {
            return format.replace( "%y", year ).replace( "%m", month+1 ).replace( "%d", date );
        }
 
 
        /*
         * API
         */
        public function get isLeapYear():Boolean
        {
            return __calendarImpl.isLeapYear;
        }
 
        public function get isGregorian():Boolean
        {
            return __calendarImpl is GregorianCalendar;
        }
 
        public function get gregorianChange():SimpleDate
        {
            return __gregorianChange;
        }
 
        public function isPreviousTo( dateToCompare:SimpleDate ):Boolean
        {
            var date0:Number = Number
            (
                String( year ) +
                ( month<10 ? "0"+String(month) : String(month) ) +
                ( date<10 ? "0"+String(date) : String(date) )
            );
            var date1:Number = Number
            (
                String( dateToCompare.year ) +
                ( dateToCompare.month<10 ? "0"+String(dateToCompare.month) : String(dateToCompare.month) ) +
                ( dateToCompare.date<10 ? "0"+String(dateToCompare.date) : String(dateToCompare.date) )
            );
            return date0 <date1;
        }
 
        public function addDays( numberOfDays:uint ):void
        {
            for( var i:uint=0; i<numberOfDays; i++ )
            {
                if( date == daysInMonth )
                {
                    date = 1;
                    if( month == DECEMBER )
                    {
                        year++;
                        month = JANUARY;
                    }
                    else
                    {
                        month++;
                    }
                }
                else
                {
                    date++;
                }
            }
        }
 
        public function addMonths( numberOfMonths:uint ):void
        {
            for( var i:uint=0; i<numberOfMonths; i++ )
            {
                if( month == DECEMBER )
                {
                    year++;
                    month = JANUARY;
                }
                else
                {
                    month++;
                }
            }
        }
 
        public function getMonthName():String
        {
            return monthNames[month];
        }
 
        public function get daysInMonth():Number
        {
            return __calendarImpl.daysInMonth;
        }
 
        public function get daysInYear():Number
        {
            return  __calendarImpl.daysInYear;
        }
 
        public function get year():Number
        {
            return __calendarImpl.year;
        }
        public function set year( value:Number ):void
        {
            __calendarImpl.year = value;
            adjustCalendarImpl();
        }
 
        public function get month():Number
        {
            return __calendarImpl.month;
        }
        public function set month( value:Number ):void
        {
            __calendarImpl.month = value;
            adjustCalendarImpl();
        }
 
        public function get date():Number
        {
            return __calendarImpl.date;
        }
        public function set date( value:Number ):void
        {
            __calendarImpl.date = value;
            adjustCalendarImpl();
        }
    }
} 