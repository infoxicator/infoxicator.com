Introduction: The evolution from 'poor man's bit coding' to high-fidelity UI generation
0:07
[music]
0:14
Okay. Hello everybody. So I know I am
0:17
the person standing between you and your
0:19
lunch and but this is going to be a very
0:22
interesting talk that combines the the
0:24
previous two talks into the future and
0:27
that's what I want to talk about today.
0:29
So back in November 2022, what we used
0:32
to do was we used to go to charg and ask
0:35
charg to um create a component and we
0:38
would just copy paste. You had to ask
0:41
replying code blocks then you know again
0:44
fix it repeat and this is what I call
0:47
the poor man's bite coding. And we have
0:51
come a long way um it it kind of worked.
0:55
Um it was very exciting. you could get u
0:58
models to could actually build some UI
1:00
for you. Um and surely that was not
1:04
going to write better code than me,
1:06
right? And then things improved very
1:08
very rapidly, very very fast.
1:12
What happened last year and if you are
1:14
aware what happened in the the the last
1:16
months of 2025 was this acceleration an
1:20
incredible inflection point uh where
1:23
things changed and it will go down in
1:25
the history books as uh things changed
1:28
very fast all at once and this is in
1:30
part because of the release of uh two
1:33
very important models which were uh 5.2
1:36
charg sorry it was yeah GPT 5.2 2 and
1:40
Oppus 4.5 and they were not just very
1:43
good at uh most of the task uh long
1:47
horizon tasks they were also very good
1:50
at high fidelity UI generation
1:53
and they were producing very good
1:56
working UI sometimes thoughtful
1:59
sometimes really really good and also
2:02
very fast.
2:05
Now I experienced this when um I tried
2:08
one of these models uh tried to rewrite
2:10
my my blog. I know people have used this
2:12
in a more creative ways but I just tried
2:14
you know a single prompt rewrite my blog
2:16
and then it did this which I didn't ask
2:18
for. um it created a nice nice search
2:22
box with a blur animation with
2:25
accessibility out of the box and then
2:28
that's when I realized that in the space
2:30
of of three years uh from when charg was
2:33
released to today we went from ah you
2:37
know few lines of code is great uh it
2:40
can it runs oh it now can write better
2:46
front end code than me
2:49
and you know I I don't mind no ego u
2:54
it's just reality um so here's a
Why are we still stuck with static UI?
2:56
question if these models are so good at
2:59
writing UI code why are we still stuck
3:02
in this mainly old paradigm of mostly
3:06
static UI
3:08
and where is where is that Jarvis moment
3:11
that we've been talking about um earlier
3:13
where are my floating UI windows that
3:15
appear and disappear and why are we not
3:17
there yet? So, my name is Ruen Casses. I
3:20
am a staff engineer at Postman and I've
3:23
been looking at uh UI and generative UI
3:25
for the past year and I've been working
3:26
with MCP apps as well and today I want
3:29
to show you what we're doing today and
3:30
where we're going in the future. So, the
The new computer: Searching for the interface of the future
3:33
news are we have a new computer and as
3:37
Andrew Karpathy put it, interacting with
3:39
this new computer is like talking to the
3:42
terminal. You have direct access to this
3:45
operating system.
3:46
And the guey has not been invented yet.
3:48
It's like we are in the 70s where
3:50
everything was just text and we have a
3:52
super intelligence but we don't have a
3:54
mature interface language.
3:57
And today we are still trying to figure
3:59
out what is this new interface for for
4:04
this computer and people ask is it chat?
4:07
So I'll show you what we what we're
4:08
doing today. And actually, this was a
4:09
very recent uh a tweet last week where
4:12
people were complaining that most SAS
4:14
companies have been adding um chat to
4:17
their their home pages and everybody's
4:19
just putting chat everywhere and and
4:21
that's that's fine. I don't have a
4:23
problem with chat. Um it's not the final
4:26
UI. It's okay for now.
4:29
But the question is if it's not chat
4:31
then then what is the interface uh for
4:34
this computer? On the other hand, as we
4:36
have seen with um Chachi MCP apps is
4:40
there [clears throat] is another uh
4:42
thought which is we will have one app or
4:45
a super app to rule them all. And this
The role of MCP apps and 'Super Apps'
4:47
is where MCP apps comes in where instead
4:50
of putting all of these chat windows
4:52
into your homepages and into every
4:55
single app that you use, we will have a
4:57
super app like chatbt or cloud or Gemini
4:59
where you will be interfacing with most
5:01
of the the UI and the websites that we
5:03
have today. Um and this is good. Uh this
5:06
is the way we're using uh uh MCP apps
5:08
today to to render third party UI inside
5:11
one agent environment.
5:13
Now these two options both could be
5:16
valid and and I believe these are part
5:19
of the evolution towards finding out
5:22
what is that new interface for uh that
5:25
computer and to be honest I don't know
5:27
which one is going to be the the final
5:29
one. consumers will tell us but one
5:32
thing is that these are two different
5:33
questions. Um the question is uh where
5:36
does the uh UI runs or in this case is a
5:40
third party UI a super app or in this
5:42
case chat everywhere but most
5:44
interesting is what is the model
5:46
generating and this is what I want to
5:47
talk about today in terms of how are we
5:50
generating uh this UI and you have seen
Three levels of UI generation: Static, Declarative, and Generative
5:52
this we have mostly static declarative
5:54
and uh generative UI
5:57
and I'm going to describe uh briefly
6:00
this one so we have um to start with the
Understanding Static UI components (e.g., AG UI, Goose)
6:03
the static components way of render
6:05
rendering UI which is what most agents
6:08
uh do today. Uh the agent is just an
6:10
orchestrator. The agent makes a tool
6:13
call via MCP apps or the direct um agent
6:16
tool call. Then we will have some
6:18
parameters and data passed to predefined
6:22
static components that have been created
6:26
by developers and this is very similar
6:28
to we what we have been doing uh for the
6:30
past 20 years with with UI. um and then
6:33
the client renders the component. And if
6:34
you see here, it's very similar to just
6:36
getting a server to send some data and
6:39
then the UI will be rendered by the
6:40
client. But in this case, the agent will
6:42
be uh generating that data and the props
6:46
uh to to do this. And some examples that
6:48
we have today are the AG UI protocol.
6:51
They have an SDK when you can register a
6:54
uh client tool that uh maps to a react
6:57
component. The tool call will receive
6:59
some props. those props will be mapped
7:02
to a static component that then will be
7:04
rendered to to the user. Another example
7:07
is um goose. Um goose is an an MCP
7:11
client where you can try most of the MCP
7:13
features and goose has this really
7:14
interesting feature called goose auto
7:16
visualizer where you can just pass any
7:19
type of data to goose and goose will try
7:22
to match that data organize it and then
7:25
pass it to a set of predefined
7:26
components that the goose team have
7:28
created. In this case, we have a few um
7:31
interesting components that you can uh
7:33
use to visualize your data.
7:35
So that's the static way. That's the
7:38
most common way of generating UI today.
7:41
But I have seen an evolution recently uh
The benefits of Declarative UI (e.g., JSON/YAML renderers)
7:43
what we call now declarative UI. And
7:47
declarative UI uh takes it to uh the
7:50
next level. So we will still have some
7:52
predefined static components that
7:54
developers build and it contains your
7:57
design system and all these components
7:59
that you have. But instead of the agent
8:01
just passing the props and the data, the
8:03
agent uses a a descriptor that could be
8:07
either JSON or YAML or I've seen Python
8:10
as well with with fastcp zoo and they
8:12
have a a descriptor in in Python that
8:14
maps to these predefined static
8:16
components and then you have this
8:18
translation rendering engine that takes
8:21
those descriptors and convert them into
8:24
the final UI. How is this different?
8:27
Well, in this case, um, it is more
8:30
dynamic. There are still static
8:32
components, but it's more personalized.
8:35
And you, if you look at this and you
8:37
think that this might look familiar as
8:38
well, it's because it is not new. Um,
8:41
Netflix has been doing this for a long
8:43
time uh since the the personalization
8:45
and serverdriven UI era where when you
8:48
go to the Netflix homepage, you will get
8:51
a UI that is completely personalized to
8:53
you, but that's still mapped to the
8:56
Netflix components and UI elements.
8:59
Another very good um tool that I've seen
9:03
recently is uh JSON render. Uh JSON
9:06
render is uh been built by Versell and
9:09
it is a way to map your components using
9:12
JSON and also YAML. They released the
9:13
YAML support recently and create all of
9:16
these very dynamic, very good UI
9:19
interactions uh that you can use today.
9:23
But now JSON render uh still they say is
9:28
constrained to your static components.
9:32
And yes, there's still static
9:34
components. The LLM is not gener
9:37
generating those components. LLM is
9:38
generating the JSON. However, I think in
9:41
at this point in time, uh declarative
9:44
generative UI is probably the perfect
9:46
balance today in terms of flexibility
9:50
and consistency because you would still
9:52
want your design system, you still want
9:54
to have uh predictability of what the UI
9:56
is going to be generated, also faster
9:59
and also potentially cheaper at this
10:00
point. uh so you don't create and uh use
10:03
a lot of tokens to create the UI. But as
Moving to the next level: Generative UI components
10:06
I mentioned at the beginning, why why
10:08
are we still stuck here and what's the
10:10
next level? I think the next level would
10:12
be uh generative components and
10:14
generative components uh goes into like
10:18
the premise I put at the beginning where
10:20
the models are good at writing front-end
10:22
code. They are good at writing react.
10:23
They are good at react uh creating
10:25
JavaScript, CSS.
10:27
And the question is why we don't let
10:29
them just write that on demand at
10:33
runtime. What could possibly go wrong
10:36
with that? Right?
10:38
This model um of generating the UI uses
10:41
the aging capabilities and in this case
10:43
you can also use a tool call but instead
10:46
of calling this uh layout rendering
10:48
engine you can call the same model with
10:50
reverse sampling or you can call another
10:52
model that will generate the HTML CSS
10:56
JavaScript on demand and then it will be
10:58
passed to the client. I did this
11:00
experiment um I work at Pusman and this
11:03
experiment where I created uh this
11:05
weather agent that goes to the API, the
11:07
weather API. It creates a joke. It
11:09
creates the HTML, CSS, JavaScript all in
11:12
one tool call and you get presented with
11:15
this random but very uh imaginative UI
11:20
where everything is created by the
11:21
agent. There is no component. There is
11:24
no translation.
The challenge of trust: The need for sandboxing and containment
11:25
So there is of course a problem with
11:27
this approach. Uh and the problem with
11:28
this approach is uh if we don't trust
11:32
third party code well we should not
11:35
trust um code that is being generated by
11:38
LLMs and then just present it to the
11:40
user. Uh generative UI and this level of
11:44
generative UI needs a distribution model
11:47
and this distribution model requires a
11:49
boundary requires containment and
11:51
requires a sandbox which is what we were
11:53
talking about earlier. This is where I
11:56
think MCP apps matter a lot because MCP
12:00
apps are the best uh delivery mechanism
12:03
uh for uh generative UI. We have the
12:07
features provided by MCP including
12:09
authentication and tool calling and
12:11
message passing between the UI and the
12:13
agent. Uh is sandbox by default with
12:15
that double eye frame is the default for
12:18
third party UI delivery today. That's
12:20
this become the standard. And one
Why MCP apps are the ideal delivery mechanism for Generative UI
12:23
interesting thing is it's not just for
12:25
third party UI. It can also be used for
12:29
firstparty UI. And this is why I think
12:32
what Antropic is doing with the the
12:35
visualizer feature is very interesting
12:38
strategically speaking because they
12:40
could have just created their own
12:43
rendering um and an architecture
12:46
mechanism for delivering this
12:48
interaction in cloud but they decided to
12:51
go with MCP apps because MCP apps
12:53
provide most of those um features that I
12:56
mentioned earlier uh out of the box. So
12:59
if Anthropic decided to use MCP apps for
13:01
the first party UI, uh you can ask
13:03
yourselves why cannot do the same. It is
13:06
um a very very strong protocol and
13:09
especially when the UI is being
13:10
generated on the fly by the agents by
13:13
the the code uh coding models then is
13:16
the best um mechanism for delivery.
The 'TV/Radio' analogy: Imagining the future of agent interaction
13:21
Now
13:22
today is probably not the final form and
13:26
people keep saying is chat the final
13:29
form is MCP apps the final form we're
13:33
still we're still trying to figure this
13:35
out and the obvious future is probably
13:40
too obvious and we said about where is
13:43
my Jarvis where is my floating windows
13:47
and if you think about it that's the
13:50
obvious thing that people would think
13:51
how we would look like if we were
13:54
generating or creating a new uh user
13:56
interaction
13:57
but what I think is we don't have enough
14:01
imagination yet and and this analogy I
14:04
heard recently is very interesting when
14:06
when uh radio came out in the 30s
14:10
um the the first um sorry the the TV
14:14
came out the first uh TV shows were
14:17
radio shows with cameras
14:20
because they could not imagine what you
14:22
could do with this new technology. So
14:24
this new technology that we have today
14:26
is very similar when television came out
14:28
and we are still in the radio era where
14:32
we don't know all the amazing things
14:34
that we will do in the future with this
14:36
new media with this the new power that
14:38
we have with the with the new computer
14:40
and we can see that we cannot even
14:43
imagine what it's going to look like.
Beyond components: Towards true human-agent collaboration
14:46
Uh, of course this is a speculative but
14:47
what do I think is actually going to
14:50
happen is we are going to be moving uh
14:52
beyond components and more towards a
14:55
collaboration uh true human agent
14:58
collaboration. If you haven't heard
15:00
about the Scalroid MCP app uh definitely
15:03
check it out because the Scalroid MCP
15:06
app is not just for um output and
15:09
visualization of diagrams.
15:12
The Scaly Draw MCP app does something
15:13
very interesting which it creates a a
15:16
shared artifact. It creates a canvas
15:20
where a human and an agent can
15:23
collaborate together into a shared space
15:26
where you can go back and forth with the
15:28
agent and ask you know change this but
15:30
you can also click around modify the UI
15:33
the way that you are used to and that
15:35
becomes the new way of interacting the
15:39
new way of experiencing the the agent um
15:42
powers and and at the moment again we
15:46
are very constrained to our imagination
15:48
and and I believe these agents are very
15:50
very powerful for just to just use them
15:53
as a orchestrator and a delivery
15:56
mechanism to show me some
15:57
visualizations. So I believe beyond
16:00
components
16:01
it will be the future of generative UI
16:04
will be more a collaborative experience
16:06
where yes we will have some generative
16:09
UI but that UI is going to be super
16:12
personalized and it's going to be
16:14
collaborative.
Conclusion: Shaping the future of user interfaces
16:16
So we we are still early. Um
16:20
we don't have the answer. People say you
16:22
know what is what is the future of the
16:25
user interaction the user interfaces. We
16:27
don't know yet but we can shape that
16:30
future uh and create this uh new
16:32
computer. And that's me. Thank you so
16:35
much uh for listening to this.
16:37
[applause] You can find me uh and ask
16:39
any questions.
16:42
Thank you.