/*
remember: export, import, get, set
STARTSCREEN ------------------------------
 pretty much ok.
  -------------------------------------
Then to game:

 Main screen:
 maybe metal grey screen with galaxy map at center.
 options: 
   help screen that can be set whenever. explains all.
   place that explains where you are
   cargo
   marines
   
   starmap:
   when hovering to starts, should show stats, maybe with yellow font
   should show where you are and highlight that
   
   gamePlay:
   forms -> info screens on. 
   main screen opens with in center info about first mission:
   for example for police it could be like this:
   hi constable and congratz for your new ship. 
   i have a mission for you. we have located knows pirate xxx. at the moment he is reloading his ship at
   mercurius. go there, destroy his ship. if he survives, take his rescue pod in and bring him to luna police station.
   -> then map screen and intro how to navigate there.
   map shows location. navigate by clicking new location and choose "go there".
   -> when arriving to mercurious you get a message that pirate xxx is hailing.. says something like that he is not afraid
   of something and then you get options to try to escape or combat.
   if escapes, then compares engines. if faster escapes etc. if not then combat
   1v1 combat, after win you get message that you plunder some stuff and escape pod.
   -> you get info what mercurius accepts and gives. like new place explored. explore+1
   then map screen and info that to complete mission navigate to sol.
   maybe close combat part later for second version?  {
   - on your way you get prison brake and you get close combat screen, with message first
   like: pirate xxx has braken from his cell with some friends. who do you want to send to deal with them?
   player can choose guys.
   then close combat, if loses can choose more guys if left
   if wins message that guy is dead or wounded or something.
   }
   then at luna, gets message that mission is done. reward is handed, maybe some money, police exp, good rep,
   and get message about what luna base is and explore1+,
   
   gamePlay plan:
     load map screen:
     check if messages/missions? load z-index: 1; that has mission or message info... this could then go to missions/messages place for
     re-read if wants... clicking ok will hide again the z-index.
     up, all clickable:
     Status: docked at Earth Trading Center	Shields: offline	Weapons: offline	Warp drive: offline	velocity: 0
     center,:
     starmap. hover effect shows info and clicking gives option to travel there.
     bottom:
     Map(activated by default)	The ship(shows ships systems)	Cargo(shows cargo)	Marines(for later versions)	Missions(shows avail and done missions),
     Planets(info about explored planets)
     
*/
/*
when ship comes to target:
  - check for ambush
  - check if this is new system or same system
  - if same system, load planet info page, set gO.p.planet location, make button to dock
  - if different system, load system map, set gO.p.planet to null, set systemlocation to target
*/