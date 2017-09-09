Sunday 0:57 AM - The app is already finished. I did not have enough time today to work on it, I worked or an hour on the morning (yesterday I only did a parser to sort and group the list). Today I arrived home too late so I have been working for less than 3 hours (since 9:00 PM) to make it work as this 861083bb3591a632a97c5c19561b150708b5ba8d

Things that I'll try to make tomorrow if I had time (IMO are secondary).

_Implements the “addAppToHosts” and “removeAppFromHosts” methods, which
update the list of applications with higher Apdex whenever any of these methods
is called. Be warned that when an app gets removed, “getTopAppsByHost” still
has to return 25 items._

**There are no actions defined on the mockups for these methods :\ ... even though `getTopAppsByHost` will always return 25 items because it performs a sort every time it gets called. I do not get the point here :\**

_Specify Big-O notation of your algorithm. You should strive for an optimal solution._

**First of all, I have no computer degree, so my knowledge on this topic is not as good as I wish... Ofc I know that nested array iterations will pain my performance. I used lodash because it was easy (not optimal, yeah) to speed up development. I'll try to find a better solution and provide a git patch tomorrow.**

Things I'll do on a real project. (most of the decisions below are to speed up development)

- Use virtualdom instead of EJS.
- Use Babel or Typescript instead of vanilla JS.
- (use a framework) On this test I used some unfinished libraries I have, this is intended to show my knowledge of JS, but not suitable for production.
- Yeah, I used browserify, hope you understand why. Other tools have their own scope, I think browserify is perfect for this kind of tiny tests because is faster, simpler, etc. Nonetheless is not good for most of the cases in real frontend development.
