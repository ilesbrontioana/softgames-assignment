
    /**
     * Class used to handle the game events
     * All game events should be sent or received using this class
     */
    export class EventManager {

        public static on(eventName: string, callback: any) {
            window.addEventListener(eventName, callback);
        }

        public static off(eventName: string, callback: any) {
            window.removeEventListener(eventName, callback);
        }

        public static emit(eventName: string, params: any = null) {
            let event = this.getEvent(eventName, params);
            event["params"] = params;
            window.dispatchEvent(event);
        }

        private static getEvent(eventName: string, params: any = null) {
                let event;
                if (typeof(Event) === 'function') {
                    event = new Event(eventName, params);
                } else {
                    event = document.createEvent('Event');
                    event.createEvent(eventName, true, true);
                }
                return event;

        }
    }
