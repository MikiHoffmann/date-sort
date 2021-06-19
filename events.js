/* EVENTS IN MONTMARTRE */
// set events
function $allEvents(title,year,month,day,discription,image) {
    this.title = title;
    this.year = year;
    this.month = month;
    this.day = day;
    this.discription = discription;
    this.image = image;
}
// the separate events | events in chronological order: old --> new!
var $events = new Array();
$events[0] = new $allEvents("Preparation for opening",2021,2,10,"we are almost ready for you","ImageBlanco.png");
$events[1] = new $allEvents("Preparation for opening",2021,4,4,"we are almost ready for you","ImageBlanco.png");
$events[2] = new $allEvents("Preparation for opening",2021,4,23,"we are almost ready for you","ImageBlanco.png");
$events[3] = new $allEvents("Preparation for opening",2021,5,31,"we are almost ready for you","ImageBlanco.png");
$events[4] = new $allEvents("Preparation for opening",2021,6,1,"we are almost ready for you","ImageBlanco.png");
$events[5] = new $allEvents("Preparation for opening",2021,6,2,"we are almost ready for you","ImageBlanco.png");
$events[6] = new $allEvents("Preparation for opening",2021,6,3,"we are almost ready for you","ImageBlanco.png");
$events[7] = new $allEvents("Preparation for opening",2021,6,4,"we are almost ready for you","ImageBlanco.png");
$events[8] = new $allEvents("heropening",2021,6,5,"we mogen weer open!","ImageBlanco.png");
$events[9] = new $allEvents("happy sunday",2021,6,5,"Yeah! It's sunday!","ImageBlanco.png");
$events[10] = new $allEvents("it's monday",2021,6,7,"Yeah! It's sunday!","ImageBlanco.png");
// add events at the end of the array..
// reverse events for display.
$events.reverse();
// template event
var $newEventsTemplate = '<div>\'{{allEvents}}\'</div>';
var $oldEventsTemplate = '<div class="column-6 column-small-6">\'{{allEvents}}\'</div>';
var $eventTemplate = '<div class="event \'{{class}}\'"><table class="event eventTable"><tr>' + 
                '<td>\'{{day}}\' - \'{{month}}\' - \'{{year}}\'</td><td>\'{{title}}\'</td></tr>' +
                '<tr><td colspan="2">\'{{discription}}\'</td>' +
                '<tr><td colspan="2"><img src="montmartreIMAGE/Mevents/\'{{image}}\'"/></td>' +
                '</tr></table></div>';
var $blancoEventTemplate = '<div class="event \'{{class}}\'"><table class="event eventTable">' + 
                '<tr><td colspan="2">\'{{discription}}\'</td>' +
                '<tr><td colspan="2"><img src="montmartreIMAGE/Mevents/\'{{image}}\'"/></td>' +
                '</tr></table></div>';               
// process the events
function makeEvents() {
    var $prevEventContainer = [];
    var $nextEventContainer = [];
    // fill event template
    for(let i = 0; i < $events.length; i++) {
        var $theEventDay = new Date($events[i].year,$events[i].month-1,$events[i].day);
        var $oneEvent = $eventTemplate;
        $oneEvent = $oneEvent.replace('\'{{title}}\'', $events[i].title);
        $oneEvent = $oneEvent.replace('\'{{year}}\'', $events[i].year);
        $oneEvent = $oneEvent.replace('\'{{month}}\'', $events[i].month);
        $oneEvent = $oneEvent.replace('\'{{day}}\'', $events[i].day);
        $oneEvent =  $oneEvent.replace('\'{{discription}}\'', $events[i].discription);
        $oneEvent = $oneEvent.replace('\'{{image}}\'', $events[i].image);
        // sort the events
        function dateCompare() {
            var $today = new Date();
            $today.setHours(0,0,0,0);
            if($theEventDay < $today) {
                $oneEvent = $oneEvent.replace('\'{{class}}\'', "column-6 column-small-6")
                $prevEventContainer.push($oneEvent);
            }
            else if($theEventDay >= $today) {
                $nextEventContainer.push($oneEvent);
                $nextEventContainer.reverse();
                if($nextEventContainer.length === 1) {
                    $('#eventNext').html("het komende event:");
                }
                else if($nextEventContainer.length > 1) {
                    $('#eventNext').html("de komende events:");
                }   
            }
            if($nextEventContainer.length === 0) {
                $('#eventNext').html("events...");
                var $blancEvent = $blancoEventTemplate;
                $blancEvent = $blancEvent.replace('\'{{title}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{year}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{month}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{day}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{discription}}\'', 'Binnenkort hebben wij natuurlijk weer hele leuke events in de planning...' +
                '<br>Houd onze site en social media in de gaten!');
                $blancEvent = $blancEvent.replace('\'{{image}}\'', 'ImageBlanco.png');
                $nextEventContainer.push($blancEvent);
            }
        }
        dateCompare();
    }
    var $prevEvents = '';
    for(var i = 0; i < $prevEventContainer.length; i++) {
        $prevEvents += $prevEventContainer[i];
        $prevEventContainer.forEach(function() {
            $oldEventsTemplate.replace('\'{{allEvents}}\'', $oneEvent);
        });
    }
    var $nextEvents = '';
    var $newEvents;
    for(var i = 0; i < $nextEventContainer.length; i++) {       
        $nextEvents += $nextEventContainer[i];
        $newEvents = $newEventsTemplate.replace('\'{{allEvents}}\'', $nextEvents);
    }
    $('#nextEvents').html($newEvents);
    $('#prevEvents').html($prevEvents);
};
    
    
