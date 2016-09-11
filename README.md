# NewsFeedServer
API for news

###endpoint examples:

####GET /story

```javascript
{
  "id": "1.3753629",
  "title": "'The biggest, baddest fish in the ocean': Why people are fascinated by bluefin tuna",
  "status": "",
  "date": "Sep 10, 2016 11:55 PM AT",
  "summary": "As long as Jeff MacNeill can remember, he has posed for photos next to the giant fish that have been hauled aboard a boat in what he calls \"the battle.\"",
  "timestamp": 1473562544293,
  "imageUrl": "http://i.cbc.ca/1.3753664.1473429336!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_460/bluefin-1.jpg",
  "categories": [
    "News",
    "Canada",
    "PEI"
  ]
}
```

####GET /story/{storyId}

```javascript
{
  "id": "1.3710800",
  "headline": "Paramedic in Peel dons Ebola gear to rescue skunk with cup stuck on its head",
  "summary": "A paramedic officer in Peel region suited up in protective gear on Sunday morning — not for an outbreak situation — but for a rescue mission to save a skunk with a cup stuck on its head.",
  "body": "<p>A paramedic in Peel region suited up in protective gear on Sunday morning&nbsp;—&nbsp;not for an outbreak situation&nbsp;— but for a rescue mission to save a skunk with a cup stuck on its head.</p>  <p>Justin Mausz was pulling into the station on Goreway Drive north of Derry Road in Mississauga, Ont., around 7:30 a.m. Sunday, when he spotted the animal in the back parking lot with&nbsp;a cup on its head and the dome&nbsp;lid&nbsp;caught around its neck. The skunk was walking&nbsp;in circles and bumping into the wall.&nbsp;</p>  <p>\"He actually felt bad for him&nbsp;because he was just bumping into the wall,\" Supt. Jeff Walsh, of Peel Regional Paramedic Services,&nbsp;told CBC News.</p>  <p>Mausz posted video of what he saw on Twitter.</p>  <p>[EMBED]</p>  <p>So, he leaped&nbsp;into action to rescue the animal. But&nbsp;to keep the skunk spray, and smell, off his uniform,&nbsp;he donned protective gear used&nbsp;in situations involving infectious diseases, such as Ebola.</p>  <p>\"They've got to spend the rest of the day in that,\" Walsh said of the officer's&nbsp;uniforms.</p>  <p>Treading carefully, Mausz managed to get the cup off of the skunk successfully.</p>  <p></p>  <p>[EMBED]</p>  <p>Walsh said the rescue would have been normal protocol, but found&nbsp;all the attention it was gaining on social media quite funny.</p>  <p>The cherry on top: He&nbsp;managed to save the animal without getting sprayed in the process.</p>  <p>[EMBED]</p>  <p></p>  <p></p>  <p></p>",
  "headlineImage": "http://i.cbc.ca/1.3710826.1470583758!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/image.jpg"
}
```
