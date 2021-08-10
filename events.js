/* EVENTS IN MONTMARTRE */
// set events
function $allEvents(title,year,month,day,weekday,engweekday,discription,engdiscr,image) {
    this.title = title;
    this.year = year;
    this.month = month;
    this.day = day;
    this.weekday = weekday;
    this.engweekday = engweekday;
    this.discription = discription;
    this.engdiscr = engdiscr;
    this.image = image;
}
// the separate events | events in chronological order: old --> new!
var $events = new Array();
$events[0] = new $allEvents("MONTMARTRE TELT AF!",2021,6,4,"vrijdag","friday","We zijn er helemaal klaar voor!" +
                            " Alle drank staat weer koud en binnen is weer schoon! " +
                            "Morgen gaan we dan eindelijk open om 16:00 uur. We hebben er ongelooflijk veel zin in!","We are ready!" +
                            " The drinks are cold and inside it's cleaned up again. Tomorrow we finally re-open at 4PM. We're excited!","2021-6-4-aftellen.png");
$events[1] = new $allEvents("HEROPENING",2021,6,5,"zaterdag","saturday","Eindelijk is het zover! We zijn weer open!","Finally! We are open again...","2021-6-5-reopening.png");
$events[2] = new $allEvents("OPEN TOT 4:00 UUR!",2021,6,25,"vrijdag","friday","Na lang wachten mogen we weer tot 04:00 uur open en dat gaan wij vanavond dan ook zeker doen! " +
                            "Helaas zijn er nog steeds regels, maar dat mag de pret niet drukken!…","After a long time we can stay open untill 4AM." +
                            " And that's what we're going to do! But keep in mind there are still the rules...","2021-6-25-laat.png");
$events[3] = new $allEvents("EURO 2020",2021,6,27,"zondag","sunday","Vandaag moet NL weer voetballen! En aangezien dat in de kroeg weer uitgezonden mag worden…" +
                            " gaan we dat ook zeker doen in de Montmartre om 18:00 uur","Today NL is playing! And we are alowed to put it on big screen. Tonight at 6PM in the Montmartre.","2021-6-27-ek.png");
$events[4] = new $allEvents("SEE YOU @ SUNDAY LIVE",2021,7,4,"zondag","sunday","Deze zondag is Marco er weer met de gezelligste nummers.","This sunday we'll have a good time with Marco...","2021-7-4-marche.png");

// add events at the end of the array..
// reverse events for display.
$events.reverse();
// template event
var $newEventsTemplate = '<div>\'{{allEvents}}\'</div>';
var $oldEventsTemplate = '<div class="column-6 column-small-6">\'{{allEvents}}\'</div>';
var $eventTemplate = '<div class="event \'{{class}}\'"><table class="event eventTable"><tr>' + 
                '<td>\'{{weekday}}\' \'{{day}}\' - \'{{month}}\' - \'{{year}}\'</td></tr><tr><td><strong>\'{{title}}\'</strong></td></tr>' +
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
        $oneEvent = $oneEvent.replace('\'{{weekday}}\'', $events[i].weekday);
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
                $blancEvent = $blancEvent.replace('\'{{weekday}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{discription}}\'', 'Binnenkort hebben wij natuurlijk weer hele leuke events in de planning...' +
                '<br>Houd onze site en social media in de gaten!');
                $blancEvent = $blancEvent.replace('\'{{image}}\'', 'eventscoming.png');
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
// process the events for english
function makeEventsEnglish() {
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
        $oneEvent = $oneEvent.replace('\'{{weekday}}\'', $events[i].engweekday);
        $oneEvent =  $oneEvent.replace('\'{{discription}}\'', $events[i].engdiscr);
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
                    $('#eventNext').html("the next event:");
                }
                else if($nextEventContainer.length > 1) {
                    $('#eventNext').html("the next events:");
                }   
            }
            if($nextEventContainer.length === 0) {
                $('#eventNext').html("events...");
                var $blancEvent = $blancoEventTemplate;
                $blancEvent = $blancEvent.replace('\'{{title}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{year}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{month}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{day}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{weekday}}\'', '');
                $blancEvent = $blancEvent.replace('\'{{discription}}\'', 'We will plan some cool events soon...' +
                '<br>Check our site and social media!');
                $blancEvent = $blancEvent.replace('\'{{image}}\'', 'eventscoming.png');
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
    
    
